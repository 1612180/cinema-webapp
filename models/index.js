const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: true
});

const Op = Sequelize.Op;

const UserModel = require("./user");
const MovieModel = require("./movie");
const TheaterModel = require("./theater");
const TheaterStatusModel = require("./theater_status");
const TicketTypeModel = require("./ticket_type");
const TicketStatusModel = require("./ticket_status");
const ShowTimeModel = require("./show_time");
const TicketModel = require("./ticket");
const TicketShoppingCartModel = require("./ticket_shopping_cart");
const OrderModel = require("./order");
const OrderStatusModel = require("./order_status");
const OrdererTicketModel = require("./ordered_ticket");
const FoodModel = require("./food");
const FoodStatusModel = require("./food_status");
const FoodOrderModel = require("./food_order");
const FoodShoppingCartModel = require("./food_shopping_cart");
const BannerModel = require("./banner")

const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Theater = TheaterModel(sequelize, Sequelize);
const TheaterStatus = TheaterStatusModel(sequelize, Sequelize);
const TicketType = TicketTypeModel(sequelize, Sequelize);
const TicketStatus = TicketStatusModel(sequelize, Sequelize);
const ShowTime = ShowTimeModel(sequelize, Sequelize);
const Ticket = TicketModel(sequelize, Sequelize);
const TicketShoppingCart = TicketShoppingCartModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const OrderStatus = OrderStatusModel(sequelize, Sequelize);
const OrdererTicket = OrdererTicketModel(sequelize, Sequelize);
const Food = FoodModel(sequelize, Sequelize);
const FoodStatus = FoodStatusModel(sequelize, Sequelize);
const FoodOrder = FoodOrderModel(sequelize, Sequelize);
const FoodShoppingCart = FoodShoppingCartModel(sequelize, Sequelize);
const Banner = BannerModel(sequelize, Sequelize)

Theater.belongsTo(TheaterStatus);
TicketType.belongsTo(TicketStatus);
ShowTime.belongsTo(Movie);
ShowTime.belongsTo(Theater);
ShowTime.belongsTo(TicketType);
Ticket.belongsTo(ShowTime);
TicketShoppingCart.belongsTo(User);
TicketShoppingCart.belongsTo(Ticket);
Order.belongsTo(OrderStatus);
Order.belongsTo(User);
OrdererTicket.belongsTo(Order);
OrdererTicket.belongsTo(Ticket);
Food.belongsTo(FoodStatus)
FoodShoppingCart.belongsTo(User)
FoodShoppingCart.belongsTo(Food)
FoodOrder.belongsTo(Order)
FoodOrder.belongsTo(Food)

// sequelize.sync({force: true})
sequelize.sync()

module.exports = {
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
  Banner
};
