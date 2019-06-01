drop table if exists users;
create table users
(
    id            serial primary key,
    username      text unique not null,
    password_hash text        not null
);

drop table if exists admins;
create table admins
(
    id            serial primary key,
    username      text unique not null,
    password_hash text        not null
);

drop table if exists movies;
create table movies
(
    id          serial primary key,
    name        text not null,
    rating      float,
    description text,
    img         text
);

drop table if exists cinemas;
create table cinemas
(
    id            serial primary key,
    name          text not null,
    address       text,
    seat_capacity int
);

drop table if exists movie_showings;
create table movie_showings
(
    id        serial primary key,
    id_cinema int,
    id_movie  int,
    from_date date,
    to_date   date
);

drop table if exists booked_performance_seats;
create table booked_performance_seats
(
    id          serial primary key,
    id_cinema   int,
    seat_number int,
    date        date,
    from_time   time,
    to_time     time,
    id_booking  int,
    money       int
);

drop table if exists bookings;
create table bookings
(
    id      serial primary key,
    id_user int,
    money   int
);

insert into movies(name, rating, description, img)
values ('Đại úy Marvel', 7.1,
        'Lấy bối cảnh những năm 90s, Captain Marvel là một cuộc phiêu lưu hoàn toàn mới đến với một thời kỳ chưa từng xuất hiện trong vũ trụ điện ảnh Marvel. Bộ phim kể về con đường trở thành siêu anh hùng mạnh mẽ nhất vũ trụ của Carol Danvers. Bên cạnh đó, trận chiến ảnh hưởng đến toàn vũ trụ giữa tộc Kree và tộc Skrull đã lan đến Trái Đất, liệu Danvers và các đồng minh có thể ngăn chặn binh đoàn Skrull cũng như các thảm họa tương lai?',
        'https://i.imgur.com/5eBe9mb.jpg'),
       ('Shazam', 7.6,
        'Tất cả chúng ta đều là người hùng, vấn đề ở chỗ chúng ta phải biết cách phát huy năng lực của mình. Trong trường hợp của Bill Batson (Angel), với sự giúp đỡ của một phù thủy cổ xưa, chỉ cần nói lớn từ “Shazam!” là đứa trẻ 14 tuổi này có thể biến thành siêu anh hùng Shazam trưởng thành (Levi). Nhưng bên trong thân hình như một vị thần đó vẫn là trái tim của một đứa trẻ. Cái tên Shazam được dựa trên chữ cái đầu của những vị thần dũng mãnh là Solomon, Hercules, Atlas, Zeus, Achilles cùng Mercury.',
        'https://i.imgur.com/5eBe9mb.jpg'),
       ('Hồ bơi tử thần', 5.8,
        'Một tình huống trớ trêu khiến đôi nam nữ rơi vào cuộc chiến giành giật sự sống từ tay tử thần. Một chuỗi những điều tuyệt vọng liên tiếp xảy ra: không thức ăn, không lối thoát, cạn nước uống, và thậm chí là dã thú ăn thịt. Mắc kẹt dưới hồ sâu 6 mét, liệu cặp đôi sẽ xoay sở để sống sót trở về? Câu trả lời đang đợi các bạn khám phá trong Hồ Bơi Tử Thần, với sự xuất hiện của Theeradej Wongpuapan - "ông hoàng điện ảnh Thái Lan”.',
        'https://i.imgur.com/5eBe9mb.jpg'),
       ('Siêu đại chiến Thái Bình Dương 2', 6,
        'Lấy bối cảnh 10 năm sau những sự kiện đã diễn ra ở phần 1, Jake Pentecost – truyền nhân duy nhất của huyền thoại Stacker Pentecost đã thực hiện lời hứa với cha mình, gia nhập nhóm người điều khiển Jaeger gồm có Lambert (Scott Eastwood) và Amara chỉ mới 15 tuổi (Cailee Spaeny), cùng nhau xây dựng nên một chiến tuyến chống lại Kaiju. Cuộc xung đột toàn cầu kéo dài giữa những quái vật âm mưu phá hủy thế giới và những robot khổng lồ do con người chế tạo ra nhằm đánh bại lũ quái vật hứa hẹn sẽ là một cuộc chiến cam go và kịch tính khi lũ quái vật giờ đây đã tiến hóa vượt bậc cả về thể lực và trí lực.',
        'https://i.imgur.com/5eBe9mb.jpg'),
       ('Nania 3', 6.3,
        'Trong The Chronicles of Narnia: The Voyage of the Dawn Treader, Edmund, Lucy và ông anh họ Eustace bị hút về Narnia trong khi ngắm bức tranh con tàu Hướng Tới Bình Minh. Họ thấy mình đang ở trên con tàu với hoàng tử Caspian và có một cuộc phiêu lưu đến những vùng đất kỳ lạ.',
        'https://i.imgur.com/mKleaqo.jpg'),
       ('Avengers Infinity War', 8.5,
        'Sau chuyến hành trình độc nhất vô nhị không ngừng mở rộng và phát triển vụ trũ điện ảnh Marvel, bộ phim Avengers: Cuộc Chiến Vô Cực sẽ mang đến màn ảnh trận chiến cuối cùng khốc liệt nhất mọi thời đại. Biệt đội Avengers và các đồng minh siêu anh hùng của họ phải chấp nhận hy sinh tất cả để có thể chống lại kẻ thù hùng mạnh Thanos trước tham vọng hủy diệt toàn bộ vũ trụ của hắn.',
        'https://i.imgur.com/wKr31In.jpg'),
       ('John Wick', 7.2,
        'Sau cái chết bất ngờ của người vợ, John Wick (Reeves) nhận được món quà cuối cùng từ cô ấy, một chú chó nhỏ giống beagle tên Daisy, và một lời nhắn "Xin anh đừng quên cách yêu thương". Nhưng cuộc sống của John lại bị quấy rối khi chiếc Boss Mustang 1969 lọt vào tầm ngắm của tên mafia Nga Iosef Tarasov(Alfie Allen). Khi John từ chối bán chiếc xe, Iosef cùng với tay sai đột nhập vào nhà John và đánh cắp nó, làm anh bất tỉnh và giết chết Daisy. Một cách vô tình, chúng đã đánh thức một trong những sát thủ tàn bạo nhất của thế giới ngầm.',
        'https://i.imgur.com/eNt6dBC.jpg'),
       ('Doctor Strange', 7.9,
        'DOCTOR STRANGE là câu chuyện về bác sĩ Giải Phẫu Thần Kinh tên Stephen Vincent Strange. Cuộc đời anh thay đổi từ sau một tai nạn xe hơi khủng khiếp. Sau tai nạn đó, Stephen nhận ra mình có những năng lực bí ẩn cũng như biết thêm về thế giới ma thuật huyền bí. Từ một vị bác sĩ bình thường, Stephen Strange dần nhận được nhiều siêu năng lực để cứu trái đất khỏi những tai họa.',
        'https://i.imgur.com/Q4WaRSN.jpg'),
       ('Thor Ragnarok', 8,
        'Ragnarok ám chỉ “tận cùng của vũ trụ”, đồng nghĩa với trận chiến sống còn của chín cõi (Nine Realms). Sau khi Loki Loki soán ngôi cha Odin, vị thần tinh quái này tiếp tục mở đường nhiễu loạn tiến từ cầu Bifrost vào trong Asgard. Ở bên kia vũ trụ, Thor (Chris Hemsworth) phải bước vào một cuộc chiến đầy khốc liệt với đối thủ mà anh sẽ gặp là một đồng đội cũ đến từ biệt đội Avenger – Hulk. Cuộc tìm kiếm sự sống còn của Thor khiến anh phải chạy đua với thời gian để ngăn chặn Hela (Cate Blanchett) tiêu diệt cả thế giới anh đang sống cùng nền văn minh Asgard.',
        'https://i.imgur.com/1ijNLQO.jpg'),
       ('Dawn of Justice', 7,
        'Nội dung bộ phim sẽ xoay quanh cuộc đối đầu có 1-0-2 của vị hiệp sĩ mạnh mẽ, đáng gờm nhất của thành phố Gotham với biểu tượng được tôn sùng nhất của thành phố Metropolis. Nguyên nhân của “cuộc chiến” này bắt nguồn từ việc họ đang lo lắng vì không thể kiểm soát được siêu anh hùng mới có sức mạnh thần thánh. Tuy nhiên, trong lúc họ “mải miết” chiến đấu với nhau thì có một mối đe dọa khác đã nổi lên và đẩy nhân loại vào tình thế nguy hiểm hơn bao giờ hết.',
        'https://i.imgur.com/octlYun.jpg'),
       ('Your Name', 9,
        'Bộ phim là câu chuyện hoán đổi cơ thể của 2 cô cậu Mitsuha - nữ sinh trung học sống ở một thị trấn nhỏ của vùng Itomori và Taki – nam sinh tại thủ đô Tokyo đầy sôi động. Mitsuha luôn chán chường với cuộc sống tẻ nhạt của mình và mơ ước được làm anh chàng đẹp trai sống tại thủ đô. Trong khi đó, Taki hằng đêm lại nhìn thấy mình trong hình hài cô gái vùng miền quê. Ước mơ của cả 2 đã thành sự thật khi sao chổi nghìn năm xuất hiện trên trái đất và rồi cứ cách ngày lại được hoán đổi cơ thể cho nhau.',
        'https://i.imgur.com/WuCVWSE.jpg'),
       ('Aquaman', 7.7,
        'Sau những sự kiện trong Justice League, Arthur Curry / Aquaman trở về biển cả và bắt đầu đảm nhận quyền thừa kế vương quốc Atlantis dưới sự cố vấn của công chúa Mera. Thế nhưng, đế chế huyền thoại bao năm ẩn mình dưới lòng biển sâu Atlantics sắp phải dậy sóng khi Orm quyết tâm thu phục 7 chủng tộc nơi đáy đại dương để tiêu diệt toàn bộ sự sống trên mặt đất. Giữa lúc biển xanh cuộn trào những đợt sóng dữ dội nhất Aquaman sẽ đương đầu với mọi việc như thế nào để bảo vệ quê hương và thế giới?',
        'https://i.imgur.com/KMjPamg.jpg');

insert into cinemas(name, address, seat_capacity)
values ('Nigamon Nguyễn Văn Cừ', '1 Nguyễn Văn Cừ Hồ Chí Minh', 10),
       ('Nigamon Giảng Võ', '2 Giảng Võ Hà Nội', 10);

insert into movie_showings(id_cinema, id_movie, from_date, to_date)
values (1, 1, '2019-01-01', '2020-01-01'),
       (2, 1, '2019-01-01', '2020-01-01'),
       (1, 2, '2019-01-01', '2020-01-01'),
       (2, 2, '2019-01-01', '2020-01-01');
