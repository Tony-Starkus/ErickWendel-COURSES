class Recorder {
  constructor(userName, stream) {
    this.userName = userName
    this.stream = stream

    this.filename = `id:${userName}-when:${Date.now()}`
    this.videoType = 'video/webm'
    this.mediaRecorder = {}
    this.recorderBlobs = []
    this.completeRecordings = []
    this.recordingActive = false
  }

  _setup() {
    const commonCodecs = [
      "codecs=vp9,opus",
      "codecs=vp8,opus",
      ""
    ]

    const options = commonCodecs
      .map(codec => ({ mimeType: `${this.videoType};${codec}` }))
      .find(options => MediaRecorder.isTypeSupported(options.mimeType))

    if (!options) {
      throw new Error(`none of the codecs: ${commonCodecs.join(',')} are supported`)
    }

    return options
  }

  startRecording() {
    console.log('recording', this.userName, this.filename)
    const options = this._setup()

    // Se não estiver recebendo mais video, ignorar
    if (!this.stream.active) return;

    this.mediaRecorder = new MediaRecorder(this.stream, options)
    console.log(`Created MediaRecorder ${this.mediaRecorder} with options ${options}`)

    this.mediaRecorder.onstop = event => {
      console.log('Recorded Blobs', this.recorderBlobs)
    }

    this.mediaRecorder.ondataavailable = event => {
      if (!event.data || !event.data.size) return;

      this.recorderBlobs.push(event.data)
    }

    this.mediaRecorder.start()
    console.log(`Media Recorder started`, this.mediaRecorder)
    this.recordingActive = true
  }

  async stopRecording() {
    if (!this.recordingActive) return;
    if (this.mediaRecorder.state === 'inactive') return

    console.log('media recorder stopped!', this.userName)
    this.mediaRecorder.stop()

    this.recordingActive = false

    await Util.sleep(200)

    this.completeRecordings.push([...this.recorderBlobs])
    this.recorderBlobs = []
  }

  getAllVideoURLs() {
    return this.completeRecordings.map(recording => {
      const superBuffer = new Blob(recording, { type: this.videoType })

      return window.URL.createObjectURL(superBuffer)
    })
  }

  download() {
    if (!this.completeRecordings.length) return

    for (const recording of this.completeRecordings) {
      const blob = new Blob(recording, { type: this.videoType })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${this.filename}.webm`
      document.body.appendChild(a)
      a.click()
    }
  }
}