class Network {
  constructor({ host }) {
    this.host = host
  }

  parseManifestURL({ url, fileResolution, fileResolutionTag, hostTag }) {
    return url.replace(fileResolutionTag, fileResolution).replace(hostTag, this.host)
  }

  async fetchFile(url) {
    const response = await fetch(url)
    return response.arrayBuffer()
  }

  async getProperResolution(url) {
    const startMs = Date.now()
    const response = await fetch(url)
    await response.arrayBuffer()
    const endMs = Date.now()
    const durationInMs = (endMs - startMs)

    // Ao invés de calcular o throughPut vamos calcular pelo tempo
    const resolution = [
      // Pior cenário possível, 20 segundos
      { start: 3001, end: 20000, resolution: 144 },
      // Até 3 segundos
      { start: 901, end: 3000, resolution: 360 },
      // Menos de 1 segundo
      { start: 0, end: 900, resolution: 720 },
    ]

    const item = resolution.find(item => {
      return item.start <= durationInMs && item.end >= durationInMs
    })

    const LOWEST_RESOLUTION = 144
    if (!item) return LOWEST_RESOLUTION

    return item.resolution
  }
}