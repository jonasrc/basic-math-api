class HealthCheckController {
  async get(req, res) {
    res.json({'status': 'It\'s alive!'});
  };
}

module.exports = HealthCheckController;

