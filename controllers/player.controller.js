const Player = require("../models/player.model");

exports.createPlayer = async (req, res) => {
  try {
    const { firstName, lastName, team, position } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const player = new Player({
      firstName,
      lastName,
      team,
      position,
      image: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });

    const savedPlayer = await player.save();
    res.status(201).json({ msg: "saved", player: savedPlayer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readPlayer = async (req, res) => {
  try {
    const players = await Player.find().lean().exec();
    const dataPlayers = players.map((player) => ({
      firstName: player.firstName,
      lastName: player.lastName,
      team: player.team,
      position: player.position,
      image:
        player.image && player.image.data
          ? player.image.data.toString("base64")
          : null,
          id:player._id
    }));
    res.send(dataPlayers);
  } catch (error) {
    res.status(500).json({ error: error.msg });
  }
};


exports.upDatePlayer = async(req,res)=>{
    try {
        const player = await Player.findById(req.params.id)

        if(req.body.firstName){
            player.firstName = req.body.firstName
        }

        if(req.body.lastName){
            player.lastName = req.body.lastName
        }

        if(req.body.team){
            player.team = req.body.team
        }

        if(req.body.position){
            player.position = req.body.position
        }

        if(req.file){
            player.image.contentType = req.file.mimetype
            player.image.data = req.file.buffer
        }


        await player.save()

        res.json({status:'success',msg:'Updated'})

    } catch (error) {
        res.json({msg:'Cant update'})
    }
}

exports.deletePlayer = async(req,res)=>{
    try {
        await Player.findByIdAndRemove(req.params.id)
        res.status(201).json({msg:'Removed'})
    } catch (error) {
        res.status(500).json({error:error.msg})
    }
}

