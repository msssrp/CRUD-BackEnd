const Player = require('../../models/player.model')

exports.playerDataByID = async (req, res) => {
    try {
      const player = await Player.findById(req.params.id).lean().exec();
      const image = player.image.data
      res.send(image);
    } catch (error) {
      res.status(500).json({ error: error.msg });
    }
  };
