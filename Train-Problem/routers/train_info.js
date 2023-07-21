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
        const ticket1 = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
        const ticket2 = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
        return ticket2 - ticket1;
      });
  
     await trains.sort((a, b) => {
        const departure_time1 = new Date(0, 0, 0, a.departureTime.Hours, a.departureTime.Minutes + a.delayedBy, a.departureTime.Seconds);
        const departure_time2 = new Date(0, 0, 0, b.departureTime.Hours, b.departureTime.Minutes + b.delayedBy, b.departureTime.Seconds);
        return departure_time2 - departure_time1;
      });
  
      return trains;
    } catch (error) {
      throw error;
    }
  }

const getOrderedTrain = async(req,res) => {
    try {
        let Trains = await axios.get(apiURL,{headers});
        const sortedTrains = await sortTrains(Trains.data);

         res.status(200).send({
            msg: 'success',
            data: sortedTrains
        })
        
    } catch (error) {
        res.status(500).send({error: e.message})
    }
}
module.exports = {
    getOrderedTrain
}