require('dotenv').config();
const axios = require('axios');

const token = process.env.TOKEN;
const headers = {
    Authorization: `Bearer ${token}`,
  };

const apiURL = 'http://20.244.56.144/train/trains';

async function sortTrains(trains) {
    try {
      await trains.sort((a, b) => a.price.sleeper - b.price.sleeper);

      await trains.sort((a, b) => {
        const train_ticket_1 = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
        const train_ticket_2 = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
        return train_ticket_2 - train_ticket_1;
      });
  
     await trains.sort((a, b) => {
        const departureTimeA = new Date(0, 0, 0, a.departureTime.Hours, a.departureTime.Minutes + a.delayedBy, a.departureTime.Seconds);
        const departureTimeB = new Date(0, 0, 0, b.departureTime.Hours, b.departureTime.Minutes + b.delayedBy, b.departureTime.Seconds);
        return departureTimeB - departureTimeA;
      });
  
      return trains;
    } catch (error) {
      res.status(400).send({error: e.message});
    }
  }

const getOrderedTrain = async(req,res) => {
    try {
        let Trains = await axios.get(apiURL,{headers});

        const sortedTrains = await sortTrains(Trains.data);
        console.log('Trains sorted\n ',sortedTrains);

        return res.status(200).json({
            msg: 'success',
            data: sortedTrains,
        })
        
    } catch (e) {
        res.status(500).send({error : e.message});
    }
}
module.exports = {getOrderedTrain};
