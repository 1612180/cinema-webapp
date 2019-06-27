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

async function orderTicket(orderid) {
  try {
    let ot = await OrdererTicket.findAll({
      where: {
        orderId: orderid
      }
    });

    let sum = 0;
    for (let i = 0; i < ot.length; i += 1) {
      let data_t = await Ticket.findByPk(ot[i].ticketId);
      let data_s = await ShowTime.findByPk(data_t.showTimeId);
      let data_tt = await TicketType.findByPk(data_s.ticketTypeId);
      sum += data_tt.price;
    }

    return sum;
  } catch {
    return 0;
  }
}

async function orderFood(orderid) {
  try {
    let dof = await FoodOrder.findAll({
      where: {
        orderId: orderid
      }
    });

    let sum = 0;
    for (let i = 0; i < dof.length; i += 1) {
      let data_f = await Food.findByPk(dof[i].foodId);
      sum += data_f.price * dof[i].quantity;
    }

    return sum;
  } catch (err) {
    return 0;
  }
}

async function order(orderid) {
  let sum_t = await orderTicket(orderid);
  let sum_f = await orderFood(orderid);

  return sum_t + sum_f;
}

module.exports = {
  order
};
