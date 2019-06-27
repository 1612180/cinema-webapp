const {
  Op,
  User,
  Movie,
  Theater,
  TheaterStatus,
  TicketType,
  TicketStatus,
  ShowTime,
  Ticket,
  TicketShoppingCart,
  Order,
  OrderStatus,
  OrdererTicket,
  Food,
  FoodStatus,
  FoodOrder,
  FoodShoppingCart,
  Banner,
  MovieGenre
} = require("../models");

async function ticket(orderid) {
  try {
    let dot = await OrdererTicket.findAll({
      where: {
        orderId: orderid
      }
    });

    let data_r1 = [];
    let data_r2 = [];
    let data_r3 = [];
    let data_r4 = [];
    let data_r5 = [];
    for (let i = 0; i < dot.length; i += 1) {
      let data_t = await Ticket.findByPk(dot[i].ticketId);
      let data_s = await ShowTime.findByPk(data_t.showTimeId);
      let data_tt = await TicketType.findByPk(data_s.ticketTypeId);
      let data_m = await Movie.findByPk(data_s.movieId);
      let data_th = await Theater.findByPk(data_s.theaterId);
      data_r1.push(data_t);
      data_r2.push(data_s);
      data_r3.push(data_tt.price);
      data_r4.push(data_m.name);
      data_r5.push(data_th.name);
    }

    return {
      data_r1: data_r1,
      data_r2: data_r2,
      data_r3: data_r3,
      data_r4: data_r4,
      data_r5: data_r5
    };
  } catch (err) {
    return {};
  }
}

async function food(orderid) {
  try {
    let data_foodOrder = await FoodOrder.findAll({
      where: {
        orderId: orderid
      }
    });

    let data_r1 = [];
    let data_r2 = [];

    for (let i = 0; i < data_foodOrder.length; i += 1) {
      let data_food = await Food.findByPk(data_foodOrder[i].foodId);
      data_r1.push({ name: data_food.name, price: data_food.price });
      data_r2.push(data_foodOrder[i].quantity);
    }

    return { data_r1: data_r1, data_r2: data_r2 };
  } catch (err) {
    return {};
  }
}

module.exports = {
  ticket,
  food
};
