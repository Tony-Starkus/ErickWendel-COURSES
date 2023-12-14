class Service {
  async makeRequest(url) {
    console.log('tá chamando?')
    return (await fetch(url)).json()
  }

  async getPlanets(url) {
    const data = await this.makeRequest(url);

    return {
      name: data.name,
      surfaceWater: data.surface_water,
      appeardIn: data.films.length
    }
  }
}

module.exports = Service