const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://hlctex.com';
const today = '2026-08-09';

const catalogMeta = {
  '': ['HLC — вертикально интегрированный производитель трикотажных тканей', 'HLC производит трикотажные ткани для детской одежды, пижам, белья и повседневной одежды: бамбуковая вискоза, хлопок, шерсть и функциональные смеси.'],
  'textile': ['Коллекции трикотажных тканей HLC', 'Каталог трикотажных тканей HLC: бамбуковая вискоза, функциональные ткани, шерсть, ткани с мерсеризацией, жидким аммиаком, песочной стиркой и вышивкой.'],
  'textile/bamboo-fabric': ['Бамбуковые трикотажные ткани оптом | HLC', 'Бамбуковая вискоза и смесовые трикотажные ткани для детской одежды, пижам и белья. Характеристики, цены, MOQ, сроки и результаты испытаний.'],
  'textile/mercerized-liquid-ammonia-fabric': ['Мерсеризованные ткани и отделка жидким аммиаком | HLC', 'Хлопковые трикотажные ткани SUPIMA, BCI и Giza с мерсеризацией и отделкой жидким аммиаком для более гладкой поверхности и стабильных размеров.'],
  'textile/functional': ['Функциональные трикотажные ткани | HLC', 'Функциональные трикотажные ткани с влагоотведением, терморегуляцией, защитой от УФ и эластичностью для спортивной и повседневной одежды.'],
  'textile/wool-fabric': ['Трикотажные ткани из мериносовой шерсти | HLC', 'Трикотаж из мериносовой шерсти, шерсти без мьюлесинга, ZQ Merino и сертифицированных RWS смесей для базовых слоёв и одежды.'],
  'textile/womenswear-fabric': ['Трикотажные ткани с песочной стиркой | HLC', 'Мягкие драпирующиеся трикотажные ткани из модала, вискозы EcoCosy и смесовых волокон для женской одежды.'],
  'textile/embroidered-fabric': ['Вышитые ткани на заказ | HLC', 'Разработка вышитых тканей на заказ для женской, праздничной, детской и брендированной одежды.']
};

const headingMap = {
  'textile/bamboo-fabric': 'Бамбуковые трикотажные ткани',
  'textile/mercerized-liquid-ammonia-fabric': 'Мерсеризованные ткани и отделка жидким аммиаком',
  'textile/functional': 'Функциональные трикотажные ткани',
  'textile/wool-fabric': 'Трикотажные ткани из шерсти',
  'textile/womenswear-fabric': 'Трикотажные ткани с песочной стиркой',
  'textile/embroidered-fabric': 'Вышитые ткани'
};

const phrases = [
  ['KNIT FABRICS · RESPONSIBLE FINISHING', 'ТРИКОТАЖНЫЕ ТКАНИ · ОТВЕТСТВЕННАЯ ОТДЕЛКА'],
  ['HLC connects next-to-skin knit development with lower-impact dyeing and finishing—balancing softness, dimensional stability, wash performance and resource efficiency.', 'HLC объединяет разработку трикотажа для непосредственного контакта с кожей с ресурсосберегающим крашением и отделкой, обеспечивая мягкость, стабильность размеров, устойчивость к стирке и эффективное использование ресурсов.'],
  ['01 / LOWER-IMPACT COLOUR', '01 / РЕСУРСОСБЕРЕГАЮЩЕЕ КРАШЕНИЕ'],
  ['A fibre-colouration approach designed to reduce water and chemical use while maintaining colour performance and a soft hand for next-to-skin fabrics.', 'Технология окрашивания волокна, снижающая расход воды и химических веществ при сохранении стойкости цвета и мягкости тканей для непосредственного контакта с кожей.'],
  ['Explore the process', 'Подробнее о технологии'],
  ['02 / PERFORMANCE FINISHING', '02 / ФУНКЦИОНАЛЬНАЯ ОТДЕЛКА'],
  ['Lafer and Pukwang finishing lines help improve lustre, softness, dimensional stability and wash performance for premium knitted fabrics.', 'Линии отделки Lafer и Pukwang улучшают блеск, мягкость, стабильность размеров и устойчивость премиального трикотажа к стирке.'],
  ['Bamboo Blend Development', 'Разработка смесового бамбукового трикотажа'],
  ['Softer, more stable bamboo viscose knits developed for babywear, sleepwear and next-to-skin apparel.', 'Более мягкий и стабильный трикотаж из бамбуковой вискозы для детской одежды, пижам и изделий первого слоя.'],
  ['Low-Temperature Dyeing', 'Низкотемпературное крашение'],
  ['Improving water and energy efficiency while protecting the hand feel and colour performance of knitted fabrics.', 'Снижение расхода воды и энергии с сохранением мягкости и стойкости цвета трикотажных тканей.'],
  ['Functional Knit Structures', 'Структуры функционального трикотажа'],
  ['Balancing breathability, stretch and next-to-skin comfort for active and everyday apparel programmes.', 'Баланс воздухопроницаемости, эластичности и комфорта для спортивной и повседневной одежды.'],
  ['Bamboo & Wool Blends', 'Смеси бамбуковой вискозы и шерсти'],
  ['Bamboo &amp; Wool Blends', 'Смеси бамбуковой вискозы и шерсти'],
  ['Combining the silky hand of bamboo viscose with wool warmth for seasonal next-to-skin knits.', 'Сочетание шелковистой мягкости бамбуковой вискозы и тепла шерсти в сезонном трикотаже первого слоя.'],
  ['Lightweight UV Knits', 'Лёгкий трикотаж с защитой от УФ'],
  ['Lightweight knit development focused on coverage, wash durability and everyday sun-protection applications.', 'Разработка лёгкого трикотажа с хорошей укрывистостью, устойчивостью к стирке и защитой от солнца для повседневной одежды.'],
  ['Fluid drape, refined surfaces and multi-fibre blends for womenswear and embroidered fabric programmes.', 'Пластичная драпировка, изысканная поверхность и многокомпонентные смеси для женской одежды и вышитых тканей.'],
  ['Certifications & Material Support', 'Сертификация и поддержка по материалам'],
  ['Certifications &amp; Material Support', 'Сертификация и поддержка по материалам'],
  ['Fabric Inspection & Testing', 'Контроль и испытания тканей'],
  ['Fabric Inspection &amp; Testing', 'Контроль и испытания тканей'],
  ['Request Specifications & Quotation', 'Запрос характеристик и коммерческого предложения'],
  ['Request Specifications &amp; Quotation', 'Запрос характеристик и коммерческого предложения'],
  ['HLC Knit Fabric Collections and Textile Finishing', 'Коллекции трикотажных тканей и отделка HLC'],
  ['Soft knit fabrics for babywear, sleepwear and next-to-skin apparel.', 'Мягкий трикотаж для детской одежды, пижам и изделий первого слоя.'],
  ['Thermoregulation, moisture management, cooling and performance development.', 'Терморегуляция, влагоотведение, охлаждающий эффект и функциональная разработка.'],
  ['Refined cotton knits with smoother surfaces and improved dimensional stability.', 'Хлопковый трикотаж с более гладкой поверхностью и улучшенной стабильностью размеров.'],
  ['Merino wool and RWS-certified wool blend fabrics.', 'Ткани из мериносовой шерсти и смесей, сертифицированных RWS.'],
  ['Soft-touch modal, EcoCosy® viscose and polyester blend knits with a relaxed drape.', 'Мягкий трикотаж из модала, вискозы EcoCosy® и полиэфирных смесей со свободной драпировкой.'],
  ['Custom decorative fabrics for womenswear, occasionwear and branded apparel.', 'Декоративные ткани на заказ для женской, праздничной и брендированной одежды.'],
  ['01 / BAMBOO', '01 / БАМБУКОВАЯ ВИСКОЗА'], ['02 / PERFORMANCE', '02 / ФУНКЦИОНАЛЬНЫЕ ТКАНИ'],
  ['03 / FINISHING', '03 / ОТДЕЛКА'], ['04 / WOOL', '04 / ШЕРСТЬ'], ['05 / SAND WASH', '05 / ПЕСОЧНАЯ СТИРКА'], ['06 / EMBROIDERY', '06 / ВЫШИВКА'],
  ['Ongoing exploration in fibres, knit structures and finishing processes. Images, test data and development progress will be added after validation.', 'Мы продолжаем исследовать волокна, трикотажные структуры и процессы отделки. Изображения, результаты испытаний и этапы разработки публикуются после проверки.'],
  ['Softer, more stable bamboo viscose knit solutions for babywear, sleepwear and next-to-skin apparel.', 'Более мягкие и стабильные решения из бамбуковой вискозы для детской одежды, пижам и изделий первого слоя.'],
  ['Improving knit-fabric environmental performance through lower dyeing temperatures and better water and energy efficiency.', 'Снижение воздействия трикотажа на окружающую среду благодаря более низкой температуре крашения и эффективному использованию воды и энергии.'],
  ['Balancing breathability, stretch and wearing comfort for active and lifestyle apparel.', 'Баланс воздухопроницаемости, эластичности и комфорта для спортивной и повседневной одежды.'],
  ['Combining bamboo viscose smoothness with wool warmth for autumn and winter next-to-skin knits.', 'Сочетание гладкости бамбуковой вискозы и тепла шерсти в осенне-зимнем трикотаже первого слоя.'],
  ['Lightweight, coverage-focused and wash-stable development for outdoor and everyday sun-protective apparel.', 'Лёгкий, укрывистый и устойчивый к стирке трикотаж для активного отдыха и повседневной одежды с защитой от солнца.'],
  ['Expanding sand-washed and embroidered fabric options through softer hand feel, refined drape, surface detail and multi-fibre blends.', 'Расширение ассортимента тканей с песочной стиркой и вышивкой за счёт мягкости, изысканной драпировки, фактурной поверхности и многокомпонентных смесей.'],
  ['Vertically Integrated Babywear Fabric Manufacturer', 'Вертикально интегрированный производитель тканей для детской одежды'],
  ['Bamboo Viscose & Functional Knit Fabric Supplier', 'Поставщик трикотажа из бамбуковой вискозы и функциональных тканей'],
  ['Comfort-led knits.', 'Трикотаж с особым комфортом.'],
  ['Built for dependable production.', 'Создан для стабильного серийного производства.'],
  ['A softer hand, with a lighter footprint.', 'Мягче на ощупь — меньше воздействие на ресурсы.'],
  ['Bamboo viscose and functional knit fabrics for babywear, sleepwear, loungewear and underwear—supported by technical testing, scalable production and responsible finishing.', 'Бамбуковая вискоза и функциональный трикотаж для детской одежды, пижам, домашней одежды и белья — с лабораторными испытаниями, масштабируемым производством и ответственной отделкой.'],
  ['MATERIAL × PROCESS', 'МАТЕРИАЛ × ПРОЦЕСС'],
  ['Waterless Dyeing', 'Маловодное крашение'],
  ['Mercerization & Liquid Ammonia', 'Мерсеризация и отделка жидким аммиаком'],
  ['Mercerization &amp; Liquid Ammonia', 'Мерсеризация и отделка жидким аммиаком'],
  ['Latest developments', 'Последние разработки'],
  ['Learn more', 'Подробнее'],
  ['More developments', 'Больше разработок'],
  ['Our People', 'Наша команда'],
  ['Products', 'Продукция'], ['Solutions', 'Решения'], ['About HLC', 'О компании'],
  ['Sustainability', 'Устойчивое развитие'], ['Careers', 'Карьера'], ['Contact Us', 'Контакты'], ['Contact us', 'Контакты'], ['Contact', 'Контакты'],
  ['Home', 'Главная'], ['Search', 'Поиск'], ['Website tools', 'Инструменты сайта'], ['Site tools', 'Инструменты сайта'], ['Primary navigation', 'Основная навигация'],
  ['Bamboo Viscose Knit Fabrics', 'Бамбуковые трикотажные ткани'], ['Bamboo Fabrics', 'Бамбуковые ткани'], ['Bamboo Fabric', 'Бамбуковая ткань'],
  ['Functional Knit Fabrics', 'Функциональные трикотажные ткани'], ['Wool Fabrics', 'Шерстяные ткани'], ['Sand-Washed Knit Fabrics', 'Трикотаж с песочной стиркой'], ['Embroidered Fabrics', 'Вышитые ткани'],
  ['Why choose HLC?', 'Почему выбирают HLC?'], ['Why bamboo viscose fabric?', 'Почему бамбуковая вискоза?'], ['Why choose wool fabric?', 'Почему выбирают шерстяные ткани HLC?'],
  ['Characteristics', 'Характеристики'], ['Composition', 'Состав'], ['Weight', 'Плотность'], ['Cuttable width', 'Полезная ширина'], ['Construction', 'Переплетение'],
  ['Current price', 'Текущая цена'], ['Valid through Aug 30, 2026', 'Действительно до 30 августа 2026 г.'], ['valid through Aug 30, 2026', 'действительно до 30 августа 2026 г.'], ['(valid through Aug 30)', '(действительно до 30 августа)'],
  ['SAMPLE REQUEST', 'ЗАПРОС ОБРАЗЦА'],
  ['Request a sample', 'Запросить образец'], ['Request this fabric sample', 'Запросить образец этой ткани'], ['Sample request', 'Запрос образца'], ['Submit', 'Отправить'],
  ['Product information', 'Информация о продукте'], ['Product description', 'Описание продукта'], ['Details', 'Детали'], ['Test results', 'Результаты испытаний'], ['Other', 'Другое'],
  ['Yarn count', 'Номер пряжи'], ['Weight conversion', 'Пересчёт веса'], ['Sample lead time', 'Срок изготовления образца'], ['Bulk lead time', 'Срок серийного производства'], ['Applications', 'Применение'], ['Finishing', 'Отделка'], ['MOQ/MCQ', 'MOQ/MCQ'],
  ['Similar fabrics', 'Похожие ткани'], ['YOU MAY ALSO LIKE', 'ВАМ ТАКЖЕ МОЖЕТ ПОНРАВИТЬСЯ'], ['View product', 'Смотреть продукт'], ['View fabric', 'Смотреть ткань'], ['Show filters', 'Показать фильтры'],
  ['Worldwide shipping', 'Доставка по всему миру'], ['In-house inspection and test support', 'Собственная лаборатория и испытания'], ['Price on request', 'Цена по запросу'],
  ['Application options', 'Варианты применения'], ['Composition options', 'Варианты состава'], ['No fabrics match the selected filters.', 'Нет тканей, соответствующих выбранным фильтрам.'],
  ['Company Profile', 'Профиль компании'], ['Who We Are', 'О компании'], ['Integrity', 'Доверие'], ['First', 'прежде всего'], ['Quality Management', 'Управление качеством'],
  ['Certificates & Certifications', 'Сертификаты'], ['Certificates &amp; Certifications', 'Сертификаты'], ['People & Culture', 'Люди и корпоративная культура'], ['People &amp; Culture', 'Люди и корпоративная культура'],
  ['Inspection & Testing Centre', 'Центр контроля и испытаний'], ['Inspection &amp; Testing Centre', 'Центр контроля и испытаний'],
  ['Not a slogan.', 'Не лозунг.'], ['A process decision.', 'А технологическое решение.'], ['Designed to use less.', 'Разработано для снижения расхода ресурсов.'], ['A cleaner process.', 'Более чистый процесс.'], ['A cleaner surface.', 'Более чистая поверхность.'],
  ['Not surface decoration.', 'Не просто внешняя отделка.'], ['A performance decision.', 'А решение для улучшения характеристик.'], ['Related Products', 'Связанные продукты'],
  ['Fluid softness.', 'Пластичная мягкость.'], ['Low shrinkage.', 'Низкая усадка.'], ['Premium fibres.', 'Премиальные волокна.'], ['A refined finish.', 'Изысканная отделка.'],
  ['Email for business', 'Рабочий e-mail'], ['Business email', 'Рабочий e-mail'], ['Generate sample email', 'Создать письмо-запрос'], ['Create sample request email', 'Создать письмо-запрос'],
  ['Close menu', 'Закрыть меню'], ['Close image preview', 'Закрыть просмотр'], ['Open high-resolution product image', 'Открыть изображение высокого разрешения'],
  ['Enter your business email. We will prepare a sample request addressed to HLC with the current product Style#.', 'Введите рабочий e-mail. Мы подготовим письмо в HLC с запросом образца и текущим артикулом продукта.'],
  ['Your email address is used only to prepare this sample request.', 'Ваш e-mail используется только для подготовки запроса образца.'],
  ['Laboratory report for', 'Лабораторный отчёт для'], ['Open the high-resolution image to review the reported methods and results.', 'Откройте изображение высокого разрешения, чтобы ознакомиться с методами и результатами испытаний.'],
  ['Certifications & Material Support', 'Сертификация и поддержка по материалам'], ['Certifications Material Support', 'Сертификация и поддержка по материалам'],
  ['Request Specifications & Pricing', 'Запрос характеристик и цен'], ['Request Specifications Quotation', 'Запрос характеристик и предложения'],
  ['Corporate Sustainability & ESG', 'Корпоративная устойчивость и ESG'], ['Water- and Carbon-Reducing Dyeing', 'Крашение со сниженным расходом воды и выбросами'],
  ['Fabric Inspection Testing', 'Контроль и испытания тканей'], ['Water-Saving, Lower-Carbon Dyeing', 'Водосберегающее крашение с меньшими выбросами'],
  ['Construction options', 'Варианты переплетения'], ['No published fabrics match this category yet.', 'В этой категории пока нет опубликованных тканей.'],
  ['HLC BAMBOO KNIT COLLECTION', 'КОЛЛЕКЦИЯ БАМБУКОВОГО ТРИКОТАЖА HLC'], ['HLC FUNCTIONAL KNIT COLLECTION', 'КОЛЛЕКЦИЯ ФУНКЦИОНАЛЬНОГО ТРИКОТАЖА HLC'],
  ['HLC LIQUID AMMONIA KNIT COLLECTION', 'КОЛЛЕКЦИЯ ТРИКОТАЖА HLC С ОТДЕЛКОЙ ЖИДКИМ АММИАКОМ'], ['HLC MERCERIZED LIQUID AMMONIA COLLECTION', 'КОЛЛЕКЦИЯ МЕРСЕРИЗОВАННОГО ТРИКОТАЖА HLC'],
  ['HLC WOOL FABRIC COLLECTION', 'КОЛЛЕКЦИЯ ШЕРСТЯНОГО ТРИКОТАЖА HLC'],
  ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China', 'Китай, провинция Чжэцзян, Цзясин, Тунсян, Пуюань, ул. Хэнлэ, 51, 314502'],
  ['All rights reserved.', 'Все права защищены.'], ['Tel', 'Тел.'], ['Fax', 'Факс'], ['Email', 'E-mail'],
  ['Style#', 'Артикул'], ['fabrics', 'видов тканей'], ['fabric', 'ткань']
];

const terms = [
  ['Bamboo Merino Wool Spandex', 'бамбуковая вискоза / мериносовая шерсть / эластан'],
  ['Bamboo Organic Cotton', 'бамбуковая вискоза / органический хлопок'],
  ['Bamboo Cotton Spandex', 'бамбуковая вискоза / хлопок / эластан'],
  ['Bamboo Viscose Spandex', 'бамбуковая вискоза / эластан'],
  ['Bamboo Viscose', 'бамбуковая вискоза'], ['Liquid-Ammonia-Finished', 'с отделкой жидким аммиаком'], ['Liquid Ammonia', 'жидкий аммиак'], ['Liquid ammonia', 'жидкий аммиак'], ['liquid ammonia', 'жидкий аммиак'],
  ['Mercerized', 'мерсеризованный'], ['mercerized', 'мерсеризованный'], ['Sand Washed', 'с песочной стиркой'], ['Sand-Washed', 'с песочной стиркой'], ['Sand Wash', 'песочная стирка'],
  ['Temperature Regulating', 'терморегулирующий'], ['High UV Protection', 'с высокой защитой от УФ'], ['Moisture Management', 'влагоотводящий'],
  ['Reactive Digital Print', 'реактивная цифровая печать'], ['Pigment Digital Print', 'пигментная цифровая печать'], ['Reactive Print', 'реактивная печать'], ['Pigment Print', 'пигментная печать'], ['Discharge Print', 'вытравная печать'],
  ['Single Jersey', 'кулирная гладь'], ['single jersey', 'кулирная гладь'], ['French Terry', 'футер'], ['Merino Wool', 'мериносовая шерсть'],
  ['Organic Cotton', 'органический хлопок'], ['Better Cotton', 'хлопок BCI'], ['BCI Cotton', 'хлопок BCI'], ['Supima Cotton', 'хлопок SUPIMA'], ['Cotton Modal', 'хлопок / модал'],
  ['Spandex', 'эластан'], ['Polyester', 'полиэстер'], ['Nylon', 'нейлон'], ['Tencel', 'тенсель'], ['Modal', 'модал'], ['Rayon', 'вискоза'],
  ['Interlock', 'интерлок'], ['interlock', 'интерлок'], ['Jersey', 'джерси'], ['jersey', 'джерси'], ['Pique', 'пике'], ['pique', 'пике'], ['Rib', 'рибана'], ['Mesh', 'сетка'], ['Jacquard', 'жаккард'], ['Scuba', 'скуба'], ['Striped', 'полосатый'],
  ['Functional', 'функциональный'], ['Embroidered', 'вышитый'], ['Knit', 'трикотажный'], ['Wool', 'шерсть'], ['Cotton', 'хлопок'], ['Hemp', 'конопля'], ['Linen', 'лён'], ['Fabric', 'ткань'], ['Fabrics', 'ткани'],
  ['Waterless dyeing', 'маловодное крашение'], ['waterless dyeing', 'маловодное крашение'], ['Babywear', 'детская одежда'], ['babywear', 'детская одежда'], ['Kidswear', 'детская одежда'], ['kidswear', 'детская одежда'],
  ['Sand-wash modal polyester spandex jersey', 'трикотаж джерси из модала, полиэстера и эластана с песочной стиркой'],
  ['Sand-wash modal polyester spandex scuba', 'трикотаж скуба из модала, полиэстера и эластана с песочной стиркой'],
  ['Sand-wash modal vertical stripe scuba', 'трикотаж скуба из модала в вертикальную полоску с песочной стиркой'],
  ['Sand-wash modal polyester PIQUE', 'трикотаж пике из модала и полиэстера с песочной стиркой'],
  ['Ultra-fine sand-washed scuba fabric', 'ультратонкий трикотаж скуба с песочной стиркой'],
  ['Sleepwear', 'пижамы'], ['sleepwear', 'пижамы'], ['Loungewear', 'домашняя одежда'], ['loungewear', 'домашняя одежда'], ['Underwear', 'нижнее бельё'], ['underwear', 'нижнее бельё'], ['Womenswear', 'женская одежда'], ['womenswear', 'женская одежда'], ['Menswear', 'мужская одежда'], ['menswear', 'мужская одежда'],
  ['Pajamas', 'пижамы'], ['pajamas', 'пижамы'], ['bodysuit', 'боди'], ['romper', 'ромпер'], ['days', 'дней'], ['yarn', 'пряжа']
  ,['premium', 'премиальный'], ['Premium', 'Премиальный'], ['high-end', 'премиальный'], ['refined', 'изысканный'], ['elevated', 'премиальный'], ['relaxed', 'свободный'], ['lightweight', 'лёгкий'], ['heavyweight', 'плотный'], ['Heavyweight', 'плотный'],
  ['close-to-skin', 'для первого слоя'], ['lifestyle essentials', 'повседневная одежда'], ['casual', 'повседневный'], ['business', 'деловой'], ['smart', 'элегантный'], ['uniforms', 'униформа'], ['uniform', 'униформа'],
  ['performance', 'функциональный'], ['outdoor', 'для активного отдыха'], ['running', 'беговой'], ['hiking', 'походный'], ['cycling wear', 'велосипедная одежда'], ['training', 'тренировочный'], ['gym wear', 'одежда для фитнеса'], ['yoga', 'для йоги'],
  ['sports bras', 'спортивные бра'], ['compression wear', 'компрессионная одежда'], ['stretch garments', 'эластичная одежда'], ['sweat-style', 'в стиле свитшота'], ['shirting', 'сорочечная ткань'],
  ['homewear', 'домашняя одежда'], ['everyday comfort garments', 'комфортная повседневная одежда'], ['travel tops', 'топы для путешествий'], ['casual sets', 'повседневные комплекты'],
  ['baby pajamas', 'детские пижамы'], ['zippies', 'комбинезоны на молнии'], ['the fabric balances close-to-skin comfort with wash durability and shape retention', 'ткань сочетает комфорт при контакте с кожей, устойчивость к стирке и сохранение формы'],
  ['brands seeking soft touch with improved durability, consistent colour and practical wash performance', 'бренды, которым нужны мягкость, повышенная износостойкость, стабильный цвет и практичность при стирке'],
  ['per colour', 'на цвет'], ['Bird Eye', 'птичий глаз'], ['Supima', 'SUPIMA'], ['SORONA', 'Sorona'], ['COTTON', 'хлопок'], ['POLYESTER', 'полиэстер']
];

const applicationMap = [
  ['babywear', 'детская одежда'], ['sleepwear', 'пижамы'], ['loungewear', 'домашняя одежда'], ['underwear', 'нижнее бельё'], ['kidswear', 'детская одежда'],
  ['everyday essentials', 'повседневная одежда'], ['daily essentials', 'повседневная одежда'], ['everyday wear', 'повседневная одежда'],
  ['premium T-shirts', 'премиальные футболки'], ['luxury T-shirts', 'премиальные футболки'], ['T-shirts', 'футболки'], ['polo shirts', 'поло'], ['polos', 'поло'],
  ['golf wear', 'одежда для гольфа'], ['collared shirts', 'рубашки с воротником'], ['resort tops', 'курортные топы'], ['smart casualwear', 'повседневно-деловая одежда'],
  ['hiking apparel', 'одежда для походов'], ['running tops', 'беговые топы'], ['travel sets', 'комплекты для путешествий'], ['travel wear', 'одежда для путешествий'], ['outdoor sportswear', 'спортивная одежда для активного отдыха'],
  ['activewear', 'спортивная одежда'], ['sportswear', 'спортивная одежда'], ['base layers', 'базовые слои'], ['leggings', 'легинсы'], ['hoodies', 'худи'], ['joggers', 'джоггеры'],
  ['bodysuits', 'боди'], ['onesies', 'комбинезоны'], ['rompers', 'ромперы'], ['swaddles', 'пелёнки'], ['dresses', 'платья'], ['blouses', 'блузки'], ['shirts', 'рубашки'], ['tops', 'топы'], ['skirts', 'юбки'], ['lingerie', 'нижнее бельё'], ['occasionwear', 'нарядная одежда']
];

const editorial = {
  'textile/bamboo-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>Почему выбирают HLC?</h2><p>HLC ежегодно выпускает более 1 800 тонн бамбукового трикотажа и поддерживает запас около 80 тонн сурового полотна и 100 тонн пряжи. Это позволяет быстрее запускать повторные заказы, сохранять конкурентную цену и обеспечивать предсказуемые сроки.</p><p class="bamboo-editorial-followup">За последние семь лет мы произвели свыше 13 000 тонн тканей из бамбуковой вискозы. Наша команда контролирует вязание, крашение, отделку и испытания тканей для детской одежды, пижам, белья и домашней одежды.</p><h2 class="bamboo-editorial-section-title" id="bambooBenefitsTitle">Преимущества бамбуковой вискозы</h2><p>Бамбуковая вискоза ценится за гладкую поверхность, мягкость, воздухопроницаемость и комфорт при контакте с кожей. В смеси с хлопком или эластаном характеристики можно настроить под требуемую плотность, растяжимость и восстановление формы.</p><h3>Для детской одежды и пижам</h3><p>Мягкая лицевая поверхность подходит для пижам, ромперов, боди, белья и домашней одежды.</p><h3>Проверяемые характеристики</h3><p>Для каждого артикула указаны состав, плотность, ширина, переплетение, MOQ, сроки и доступные испытания. По запросу предоставляются документы OEKO-TEX.</p></section>`,
  'textile/mercerized-liquid-ammonia-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>Премиальная отделка хлопкового трикотажа</h2><p>HLC эксплуатирует одну линию Lafer для отделки жидким аммиаком и две линии Pukwang для мерсеризации. Мы работаем с хлопком BCI, SUPIMA, Giza и другими длинноволокнистыми сортами, улучшая гладкость, блеск, мягкость и стабильность размеров.</p><h3>Для премиальных коллекций</h3><p>Такая отделка востребована для футболок, поло, белья, детской одежды, пижам и домашней одежды, где важны тонкая поверхность, насыщенный цвет и устойчивость после стирки.</p><h3>Производство и контроль</h3><p>Вязание, крашение, мерсеризация, отделка жидким аммиаком и внутренние испытания координируются одной производственной командой HLC.</p></section>`,
  'textile/functional': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>Функциональные ткани под требования коллекции</h2><p>HLC разрабатывает трикотаж с влагоотведением, охлаждающим эффектом, терморегуляцией, защитой от УФ и контролируемой эластичностью. Состав, плотность, переплетение и отделка подбираются под конечное применение и метод испытаний.</p><h3>Разработка и испытания</h3><p>Команда согласовывает целевые показатели до серийного производства и предоставляет доступные лабораторные результаты для оценки закупщиком.</p></section>`,
  'textile/wool-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>Почему выбирают шерстяные ткани HLC?</h2><p>HLC и один из ведущих мировых поставщиков шерстяной пряжи Xinao находятся в Тунсяне, провинция Чжэцзян. Более десяти лет совместной работы дали нам глубокий опыт в выборе пряжи, вязании и крашении шерстяного трикотажа, а близкая цепочка поставок помогает сохранять конкурентную цену и сроки.</p><p>Мы работаем с мериносовой шерстью без мьюлесинга, ZQ Merino и смесями, сертифицированными RWS. HLC также входит в число немногих качественных китайских красильных производств, специализирующихся на шерстяном трикотаже.</p></section>`,
  'textile/womenswear-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>Мягкая фактура и естественная драпировка</h2><p>Песочная стирка создаёт мягкую, слегка матовую поверхность и свободную драпировку. HLC разрабатывает такие ткани из модала, вискозы EcoCosy, хлопка и смесовых волокон для платьев, топов, юбок и домашней одежды.</p></section>`,
  'textile/embroidered-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>Вышивка по индивидуальному заданию</h2><p>HLC разрабатывает вышитые ткани по рисунку, основе, плотности стежка, цвету нити и назначению коллекции. Возможны проекты для женской, детской, праздничной и брендированной одежды.</p></section>`
};

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function clean(s = '') { return s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim(); }
function extract(html, re, fallback = '') { const m = html.match(re); return m ? clean(m[1]) : fallback; }
function routeUrl(route, lang = '') { return `${base}/${lang ? lang + '/' : ''}${route ? route + '/' : ''}`; }
function routeFile(prefix, route) { return path.join(root, prefix, ...(route ? route.split('/') : []), 'index.html'); }
function replacePairs(text, pairs) { let out = text; for (const [a, b] of [...pairs].sort((x, y) => y[0].length - x[0].length)) out = out.replace(new RegExp(esc(a), 'g'), b); return out; }
function translateTerms(text) { return replacePairs(text, terms); }
function translateApps(text) {
  return replacePairs(translateTerms(text), applicationMap)
    .replace(/\s+and\s+/gi, ' и ')
    .replace(/\s*&\s*/g, ' и ')
    .replace(/\s*,\s*/g, ', ');
}

function translateVisible(html) {
  const blocks = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, b => { blocks.push(b); return `__RU_BLOCK_${blocks.length - 1}__`; });
  html = html.replace(/>([^<]+)</g, (m, t) => `>${translateTerms(replacePairs(t, phrases))}<`);
  html = html.replace(/\b(alt|aria-label|placeholder|title)="([^"]*)"/gi, (m, a, v) => `${a}="${translateTerms(replacePairs(v, phrases))}"`);
  return html.replace(/__RU_BLOCK_(\d+)__/g, (_, i) => blocks[+i]);
}

function localizeLinks(html) {
  return html
    .replace(/href="\/(?!assets\/|ru\/|zh\/|ko\/|ja\/|#|bd0582e97b7f4207a8c4f6273be3b09b\.txt)([^"]*)"/g, (m, p) => `href="/ru/${p}"`)
    .replace(/https:\/\/hlctex\.com\/(?!assets\/|ru\/|zh\/|ko\/|ja\/)([^"'<\s]*)/g, (m, p) => `${base}/ru/${p}`);
}

function alternates(route) {
  const entries = [['en', routeUrl(route)], ['zh-Hans', routeUrl(route, 'zh')], ['ko', routeUrl(route, 'ko')], ['ja', routeUrl(route, 'ja')], ['ru', routeUrl(route, 'ru')], ['x-default', routeUrl(route)]];
  return entries.map(([l, u]) => `<link rel="alternate" hreflang="${l}" href="${u}">`).join('\n');
}

function injectAlternates(html, route) {
  html = html.replace(/\s*<link[^>]+hreflang=[^>]+>\s*/gi, '\n');
  const block = alternates(route);
  return /<link[^>]+rel="canonical"/i.test(html) ? html.replace(/(<link[^>]+rel="canonical"[^>]*>)/i, `$1\n${block}`) : html.replace('</head>', `${block}\n</head>`);
}

function setMeta(html, route, title, desc) {
  html = html.replace(/<html([^>]*)lang="[^"]*"/i, '<html$1lang="ru"')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\b[^>]*name="description"[^>]*>/i, `<meta name="description" content="${desc}">`)
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/i, `<link rel="canonical" href="${routeUrl(route, 'ru')}">`)
    .replace(/<meta\b[^>]*property="og:title"[^>]*>/i, `<meta property="og:title" content="${title}">`)
    .replace(/<meta\b[^>]*property="og:description"[^>]*>/i, `<meta property="og:description" content="${desc}">`)
    .replace(/<meta\b[^>]*property="og:url"[^>]*>/i, `<meta property="og:url" content="${routeUrl(route, 'ru')}">`)
    .replace(/<meta\b[^>]*name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta\b[^>]*name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${desc}">`);
  if (!/property="og:locale"/i.test(html)) html = html.replace('</title>', '</title>\n<meta property="og:locale" content="ru_RU">');
  else html = html.replace(/<meta\b[^>]*property="og:locale"[^>]*>/i, '<meta property="og:locale" content="ru_RU">');
  return injectAlternates(html, route);
}

function fixJson(html, route, product = {}) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (whole, raw) => {
    try {
      const data = JSON.parse(raw);
      const visit = value => {
        if (!value || typeof value !== 'object') return;
        if (['Product', 'CollectionPage', 'WebPage', 'Organization'].includes(value['@type'])) value.inLanguage = 'ru-RU';
        if (value['@type'] === 'Product') {
          if (product.name) value.name = product.name;
          if (product.description) value.description = product.description;
          if (product.composition) value.material = translateTerms(product.composition);
        }
        for (const key of Object.keys(value)) {
          if (['url', 'item', '@id'].includes(key) && typeof value[key] === 'string' && value[key].startsWith(base) && !value[key].includes('/assets/')) {
            const p = value[key].slice(base.length).replace(/^\/(zh\/|ko\/|ja\/|ru\/)?/, '');
            value[key] = `${base}/ru/${p}`;
          } else visit(value[key]);
        }
      };
      visit(data);
      return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
    } catch { return whole; }
  });
}

function productDescription(name, composition, weight, construction, apps) {
  const spec = [translateTerms(composition), weight, translateTerms(construction)].filter(Boolean).join(' · ');
  const use = apps ? ` Подходит для: ${translateApps(apps)}.` : '';
  return `${name} производства HLC: ${spec}. Ткань рассчитана на стабильное серийное производство и комфорт при контакте с кожей.${use} Доступны данные по MOQ, срокам изготовления образца и партии, а также результаты испытаний.`;
}

function buildProduct(slug) {
  const route = `textile/products/${slug}`;
  const src = routeFile('', route);
  let html = fs.readFileSync(src, 'utf8');
  const enName = extract(html, /<h1[^>]*data-template-field="product-name"[^>]*>([\s\S]*?)<\/h1>/i, slug);
  const name = translateTerms(enName);
  const composition = extract(html, /data-template-field="composition">([\s\S]*?)<\/dd>/i);
  const weight = extract(html, /data-template-field="weight">([\s\S]*?)<\/dd>/i);
  const construction = extract(html, /data-template-field="construction">([\s\S]*?)<\/dd>/i);
  const apps = extract(html, /data-template-field="detail-applications">([\s\S]*?)<\/dd>/i).split('. Development')[0];
  const desc = productDescription(name, composition, weight, construction, apps);
  html = localizeLinks(html);
  html = setMeta(html, route, `${name} | HLC`, desc);
  html = translateVisible(html);
  html = html
    .replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${name}</h1>`)
    .replace(/data-template-field="breadcrumb">[\s\S]*?<\/li>/i, `data-template-field="breadcrumb">${name}</li>`)
    .replace(/<p data-template-field="short-description">[\s\S]*?<\/p>/i, `<p data-template-field="short-description">${desc}</p>`)
    .replace(/<h2 data-template-field="seo-main-title">[\s\S]*?<\/h2>/i, `<h2 data-template-field="seo-main-title">Характеристики и условия закупки</h2>`)
    .replace(/<p data-template-field="seo-paragraph-1">[\s\S]*?<\/p>/i, `<p data-template-field="seo-paragraph-1">${name}: ${translateTerms(composition)}, ${weight}, ${translateTerms(construction)}. Перед серийным производством согласуются цвет, ширина, усадка и требуемые показатели.</p>`)
    .replace(/<p data-template-field="seo-paragraph-2">[\s\S]*?<\/p>/i, `<p data-template-field="seo-paragraph-2">Стандартный срок изготовления образца — 15–20 дней, серийной партии — 30–40 дней. MOQ и MCQ зависят от артикула, цвета и отделки.</p>`)
    .replace(/<p data-template-field="technical-details">[\s\S]*?<\/p>/i, `<p data-template-field="technical-details">HLC координирует закупку волокна, вязание, крашение, отделку, внутренние испытания и международную отгрузку с одной производственной площадки.</p>`)
    .replace(/(<dd data-template-field="detail-applications">)[\s\S]*?(<\/dd>)/i, `$1${translateApps(apps)}$2`)
    .replace(/Laboratory report for ([^.]+)\. Open the high-resolution image to review the reported methods and results\./g, 'Лабораторный отчёт для $1. Откройте изображение высокого разрешения, чтобы ознакомиться с методами и результатами испытаний.')
    .replace(/Enter your business email\. We will prepare a sample request addressed to HLC with the current product Style#\./g, 'Введите рабочий e-mail. Мы подготовим письмо в HLC с запросом образца и текущим артикулом продукта.')
    .replace(/aria-label="Product images"/g, 'aria-label="Изображения продукта"')
    .replace(/alt="([^"]+) front view"/g, 'alt="$1 — общий вид ткани"')
    .replace(/alt="([^"]+) texture detail"/g, 'alt="$1 — фактура ткани"')
    .replace(/alt="([^"]+) high-resolution view"/g, 'alt="$1 — изображение высокого разрешения"');
  html = fixJson(html, route, { name, description: desc, composition });
  const out = routeFile('ru', route);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
}

function buildCatalog(route) {
  let html = fs.readFileSync(routeFile('', route), 'utf8');
  const [title, desc] = catalogMeta[route];
  html = localizeLinks(html);
  html = setMeta(html, route, title, desc);
  html = translateVisible(html);
  if (headingMap[route]) html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, `<h1>${headingMap[route]}</h1>`);
  html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)\s*<span class="bamboo-catalog-count">[^<]*<\/span>/i, (m, h) => `${h}<span class="bamboo-catalog-count">${(m.match(/(\d+)/) || ['', ''])[1]} видов</span>`);
  if (editorial[route]) html = html.replace(/<section(?=[^>]*class="bamboo-filter-editorial")[^>]*>[\s\S]*?<\/section>/i, editorial[route]);
  html = fixJson(html, route);
  const out = routeFile('ru', route);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
}

const miscMeta = {
  'company/overview': ['О компании HLC | Производитель трикотажных тканей', 'HLC — вертикально интегрированный производитель трикотажных тканей с собственными мощностями для вязания, крашения, отделки и контроля качества.'],
  'company/profile': ['Профиль компании HLC GROUP CO., LTD.', 'Основные сведения о HLC GROUP CO., LTD.: направления деятельности, производство, сотрудники, рынки и продукция.'],
  'company/quality': ['Контроль качества и испытательная лаборатория HLC', 'Система контроля качества HLC и собственная лаборатория испытаний трикотажных тканей.'],
  'company/certificates': ['Сертификаты текстильного производства HLC', 'Сертификаты HLC по материалам, качеству, устойчивому развитию и системам управления.'],
  'company/esg': ['Устойчивое развитие HLC', 'Подход HLC к ресурсам, ответственным материалам, производству и устойчивому развитию.'],
  'company/recruitment': ['Карьера в HLC', 'Информация о работе и развитии команды в HLC GROUP CO., LTD.'],
  'contact': ['Контакты HLC | Производитель трикотажных тканей', 'Свяжитесь с HLC по вопросам образцов, характеристик, цен, MOQ и сроков производства трикотажных тканей.'],
  'development': ['Разработка трикотажных тканей HLC', 'Разработка трикотажных тканей HLC: анализ образцов, подбор пряжи, вязание, крашение, отделка, испытания и подготовка к серийному производству.'],
  'pickup/wl-dye': ['Маловодное крашение трикотажных тканей | HLC', 'Технология маловодного крашения HLC снижает потребление воды, пара и электроэнергии, сохраняя мягкость и эксплуатационные характеристики ткани.'],
  'pickup/mercerization-liquid-ammonia': ['Мерсеризация и отделка жидким аммиаком | HLC', 'Линии Lafer и Pukwang для мерсеризации и отделки жидким аммиаком улучшают гладкость, мягкость и стабильность хлопкового трикотажа.']
};

const miscPhrases = [
  ['Founded in 2003, HLC is a vertically integrated textile manufacturer.', 'HLC основана в 2003 году и является вертикально интегрированным производителем текстиля.'],
  ['HLC integrates sustainability into every level of its operations', 'HLC внедряет принципы устойчивого развития на всех этапах своей деятельности'],
  ['Contact details', 'Контактные данные'], ['Send an enquiry', 'Отправить запрос'], ['Your name', 'Ваше имя'], ['Your email', 'Ваш e-mail'], ['Company', 'Компания'], ['Message', 'Сообщение'],
  ['Waterless Dyeing', 'Маловодное крашение'], ['Liquid Ammonia', 'Жидкий аммиак'], ['Mercerization', 'Мерсеризация'], ['Related Products', 'Связанные продукты'],
  ['Fluid softness.', 'Пластичная мягкость.'], ['Low shrinkage.', 'Низкая усадка.'], ['Premium fibres.', 'Премиальные волокна.'], ['A refined finish.', 'Изысканная отделка.']
];

const miscRoutePhrases = {
  'company/certificates': [
    ['View original PDF', 'Открыть оригинал PDF'],
    ['Certifications & Material Support', 'Сертификация и поддержка по материалам'], ['Request Specifications & Pricing', 'Запрос характеристик и цен'], ['Corporate Sustainability & ESG', 'Корпоративная устойчивость и ESG'], ['Water- and Carbon-Reducing Dyeing', 'Крашение со сниженным расходом воды и выбросами'],
    ['Use the arrows, keyboard or swipe gesture to turn one page at a time.', 'Перелистывайте страницы стрелками, клавиатурой или жестом смахивания.'], ['Original certificate files', 'Оригиналы сертификатов'], ['Scope certificate and complete appendices · 6 pages', 'Сертификат области действия и полные приложения · 6 страниц'],
    ['Knitted fabric · Product Class I for baby articles', 'Трикотаж · класс продукции I для детских изделий'], ['Dyeing and sales of linen yarn and fabric', 'Крашение и продажа льняной пряжи и тканей'], ['Quality, environmental and occupational safety systems', 'Системы качества, экологического менеджмента и охраны труда'], ['Energy management system · Chinese and English', 'Система энергоменеджмента · китайская и английская версии'],
    ['Verified certificates', 'Проверенные сертификаты'], ['Certified Product Appendix', 'Приложение по сертифицированной продукции'], ['Certified Site Appendix', 'Приложение по сертифицированной площадке'], ['European Flax Certificate', 'Сертификат European Flax'], ['Environmental Management', 'Экологический менеджмент'], ['Occupational Health Safety', 'Охрана труда и безопасность'], ['Energy Management', 'Энергоменеджмент']
  ],
  'company/esg': [
    ['We continue to reduce water, energy and carbon impacts through waterless dyeing and lower-impact wet-processing routes.', 'Мы продолжаем снижать расход воды и энергии, а также углеродный след благодаря маловодному крашению и более эффективным процессам влажной обработки.'],
    ['HLC advances more responsible textile manufacturing through lower-impact dyeing, employee wellbeing, inclusive employment and environmental restoration.', 'HLC развивает более ответственное текстильное производство: снижает воздействие крашения, заботится о сотрудниках, поддерживает инклюзивную занятость и природоохранные инициативы.'],
    ['Renewable Energy, Water Saving & Carbon Reduction', 'Возобновляемая энергия, экономия воды и снижение выбросов'], ['We continue to reduce water, energy and carbon impacts through waterless dyeing and lower-impact wet-processing routes.', 'Мы снижаем потребление воды и энергии, а также углеродный след благодаря маловодному крашению и более эффективным процессам влажной обработки.'],
    ['Inclusive Employment Programme', 'Программа инклюзивной занятости'], ['Our inclusive employment programme creates meaningful job opportunities for people with disabilities, supported by ongoing employee volunteering.', 'Наша программа инклюзивной занятости создаёт рабочие места для людей с инвалидностью и поддерживается волонтёрскими инициативами сотрудников.'],
    ['Annual Tree-Planting Initiative', 'Ежегодная посадка деревьев'], ['Each Arbor Day, employees take part in a mountain clean-up and plant approximately 500 trees as a long-term commitment to natural resource stewardship.', 'Каждый год сотрудники участвуют в уборке природных территорий и высаживают около 500 деревьев в рамках долгосрочной экологической программы.']
  ],
  'company/overview': [
    ['HLC integrates sustainability across its operations and produces high-quality fabrics from natural, synthetic, regenerated and recycled fibres. Our core expertise includes bamboo viscose, wool, mercerized and liquid-ammonia-finished cotton, and stretch-fibre blends.', 'HLC внедряет принципы устойчивого развития во все производственные процессы и выпускает высококачественные ткани из натуральных, синтетических, регенерированных и переработанных волокон. Основные направления — бамбуковая вискоза, шерсть, мерсеризованный хлопок, хлопок с отделкой жидким аммиаком и эластичные смеси.'],
    ['We manufacture fabrics for babywear, sleepwear, loungewear and fashion applications with controlled bulk quality, in-house testing and direct production coordination.', 'Мы производим ткани для детской одежды, пижам, домашней и модной одежды, контролируя качество партий, проводя собственные испытания и напрямую координируя производство.']
  ],
  'company/profile': [
    ['Purchasing: fabric manufacturers and garment factories', 'Закупки: производители тканей и швейные фабрики'],
    ['Development, knitting, dyeing, finishing, sales and export of bamboo viscose, wool, cotton/TENCEL™, functional and other fashion fabrics; related garments and home-textile products.', 'Разработка, вязание, крашение, отделка, продажа и экспорт тканей из бамбуковой вискозы, шерсти, хлопка/TENCEL™, функциональных и других тканей для модной одежды; сопутствующие швейные изделия и домашний текстиль.'],
    ['Paid-in CNY 113,873,906.12', 'Оплаченный капитал: 113 873 906,12 юаня'], ['Purchasing: fabric manufacturers and garment factories', 'Закупки: производители тканей и швейные фабрики'], ['Sales: apparel manufacturers, retailers and e-commerce companies', 'Продажи: производители одежды, розничные сети и компании электронной торговли'], ['Europe, Southeast Asia, South Korea, Taiwan and the United States', 'Европа, Юго-Восточная Азия, Южная Корея, Тайвань и США'],
    ['Womenswear fabrics, menswear fabrics, menswear, womenswear, casual apparel, sleepwear fabrics, bedding accessories, infantwear and childrenswear.', 'Ткани для женской и мужской одежды, готовая одежда, повседневная одежда, ткани для пижам, домашний текстиль, одежда для младенцев и детей.'], ['Baby Kids Fabric Division', 'Подразделение тканей для детской одежды'], ['Casual Fabric Division', 'Подразделение повседневных тканей'], ['Garments — menswear, womenswear and finished products', 'Одежда — мужская, женская и готовые изделия'], ['Affiliated Companies', 'Связанные компании']
  ],
  'company/quality': [
    ['Trained laboratory technicians evaluate colourfastness, pH, pilling, shrinkage and other finished-fabric performance requirements.', 'Лаборатория проверяет стойкость окраски, pH, пиллингуемость, усадку и другие характеристики готовой ткани.'],
    ['X-Rite light boxes, spectrophotometers, Martindale testers, crocking testers, US-standard washers and dryers, and xenon lightfastness equipment.', 'В центре используются световые короба X-Rite, спектрофотометры, тестеры Martindale и стойкости к трению, стиральные и сушильные машины американского стандарта, а также ксеноновое оборудование для испытания светостойкости.'],
    ['Four-Point Fabric Inspection', 'Четырёхбалльная проверка ткани'], ['Our trained inspection team records and reports defects such as holes, broken ends, skew and staining under the four-point system.', 'Обученная команда контроля фиксирует и оценивает отверстия, обрывы нитей, перекосы и загрязнения по четырёхбалльной системе.'],
    ['Trained laboratory technicians evaluate colourfastness, pH, pilling, shrinkage and other finished-fabric performance requirements.', 'Лаборатория проверяет стойкость окраски, pH, пиллингуемость, усадку и другие характеристики готовой ткани.'], ['Testing equipment in our inspection centre', 'Оборудование нашего испытательного центра'], ['Equipment used for colour assessment, colourfastness, abrasion, pilling and dimensional-stability testing.', 'Оборудование для оценки цвета, стойкости окраски, истирания, пиллингуемости и стабильности размеров.'],
    ['Martindale abrasion pilling tester', 'Тестер истирания и пиллингуемости Martindale'], ['Xenon arc lightfastness tester', 'Ксеноновый тестер светостойкости'], ['X-Rite colour assessment light box', 'Световой короб X-Rite'], ['AATCC standard washer', 'Стиральная машина стандарта AATCC'], ['Crocking fastness tester', 'Тестер стойкости к трению'], ['Datacolor spectrophotometer', 'Спектрофотометр Datacolor'], ['Textile formaldehyde analyzer', 'Анализатор формальдегида в текстиле'], ['Textile shrinkage oven', 'Сушильный шкаф для испытаний усадки']
  ],
  'company/recruitment': [
    ['Build dependable textiles with people who care about materials, quality and long-term partnerships.', 'Создаём надёжный текстиль вместе с людьми, которые ценят материалы, качество и долгосрочное партнёрство.'], ['HLC values people in fabric development, quality inspection, production management and international business. We grow with colleagues who keep learning, understand materials and respect quality.', 'HLC ценит специалистов по разработке тканей, контролю качества, управлению производством и международному бизнесу. Мы растём вместе с коллегами, которые постоянно учатся, понимают материалы и уважают качество.'],
    ['Fabric Development & Analysis', 'Разработка и анализ тканей'], ['Support sample analysis, specification development and customer projects across bamboo viscose, performance yarns, knit structures and finishing hand-feel.', 'Анализ образцов, подготовка спецификаций и сопровождение проектов по бамбуковой вискозе, функциональной пряже, трикотажным структурам и отделке.'], ['Quality Inspection & Laboratory', 'Контроль качества и лаборатория'], ['Support fabric inspection and testing for colourfastness, shrinkage, pH and pilling within a consistent quality-management process.', 'Контроль и испытания тканей на стойкость окраски, усадку, pH и пиллингуемость в рамках единой системы качества.'], ['Merchandising & Production Coordination', 'Мерчандайзинг и координация производства'], ['Connect buyer requirements with production and shipment schedules, ensuring that specifications, lead times, testing and certification details are communicated accurately.', 'Согласование требований покупателя с производством и отгрузкой, включая характеристики, сроки, испытания и сертификацию.']
  ],
  'contact': [
    ['Please use the form below for fabric enquiries. Our team will review the information and contact you directly.', 'Используйте форму ниже для запроса по тканям. Наша команда рассмотрит информацию и свяжется с вами напрямую.'], ['You may include the fabric use, composition, weight, width and quantity.', 'Укажите назначение ткани, состав, плотность, ширину и требуемое количество.'], ['I agree that HLC may use the information provided to respond to this inquiry.', 'Я согласен, что HLC может использовать предоставленные данные для ответа на запрос.'], ['China office & factory', 'Офис и фабрика в Китае']
  ],
  'development': [
    ['Fabric Development', 'Разработка тканей'], ['Textile Development', 'Разработка текстиля'],
    ['From concept to bulk production', 'От концепции до серийного производства'],
    ['HLC supports fabric development from yarn and fibre selection through knitting, dyeing, finishing, testing and bulk production.', 'HLC сопровождает разработку ткани от выбора волокна и пряжи до вязания, крашения, отделки, испытаний и серийного производства.'],
    ['Sample Analysis', 'Анализ образцов'], ['Yarn & Fibre Selection', 'Подбор пряжи и волокна'], ['Yarn &amp; Fibre Selection', 'Подбор пряжи и волокна'],
    ['Knitting Development', 'Разработка трикотажной структуры'], ['Dyeing & Finishing', 'Крашение и отделка'], ['Dyeing &amp; Finishing', 'Крашение и отделка'], ['Testing & Approval', 'Испытания и согласование'], ['Testing &amp; Approval', 'Испытания и согласование']
  ],
  'pickup/wl-dye': [
    ['HLC applies a lower-water fibre colouration route designed to reduce the wet-processing load associated with conventional dyeing. The process supports stable production while using fewer resources.', 'HLC применяет маловодную технологию окрашивания волокна, которая сокращает этапы влажной обработки по сравнению с традиционным крашением. Процесс обеспечивает стабильное производство при меньшем расходе ресурсов.'], ['For buyers, waterless dyeing does not require paying a premium for lower environmental impact. By reducing water, steam, electricity and wet-processing steps, it helps lower total dyeing costs while limiting fibre friction and improving fabric softness, surface smoothness and overall performance.', 'Покупателю не приходится доплачивать за снижение воздействия на окружающую среду. Сокращение расхода воды, пара, электроэнергии и этапов влажной обработки помогает снизить стоимость крашения, уменьшить трение волокон и улучшить мягкость, гладкость и эксплуатационные свойства ткани.'], ['Compared with conventional dyeing, the Waterless route is designed around measurable reductions across the colouration process.', 'По сравнению с традиционным крашением маловодная технология обеспечивает измеримое сокращение потребления ресурсов на всём процессе окрашивания.'], ['Reduced friction during colouration helps protect the fibre surface, supporting a smoother hand, less fluff and fewer wrinkles.', 'Снижение трения при окрашивании защищает поверхность волокна, делает ткань более гладкой, уменьшает ворсистость и образование складок.'], ['The resulting knit fabric is designed for brighter appearance, improved colour fastness and better resistance to pilling - performance that can be seen and felt in the finished garment.', 'Готовый трикотаж отличается более чистым внешним видом, улучшенной стойкостью окраски и устойчивостью к пиллингу — это заметно и визуально, и на ощупь.']
  ],
  'pickup/mercerization-liquid-ammonia': [
    ['HLC operates one Lafer liquid ammonia finishing line and two Korean Pukwang mercerization finishing lines, providing specialist finishing for cotton and blended knit fabrics.', 'HLC эксплуатирует одну линию Lafer для отделки жидким аммиаком и две корейские линии Pukwang для мерсеризации хлопкового и смесового трикотажа.'], ['With controlled production, a softer hand, refined lustre and reliable dimensional stability, HLC supports programmes for multiple internationally recognised brands and their supply chains.', 'Контролируемое производство обеспечивает мягкость, деликатный блеск и стабильность размеров для программ международных брендов и их цепочек поставок.'], ['Liquid ammonia finishing gives SUPIMA cotton, Giza cotton and long-staple cotton knits a soft, refined hand, natural drape, breathability, wrinkle resistance and reliable wash stability.', 'Отделка жидким аммиаком придаёт трикотажу из хлопка SUPIMA, Giza и длинноволокнистого хлопка мягкость, естественную драпировку, воздухопроницаемость, устойчивость к сминанию и стабильность после стирки.'], ['Mercerized finishing brings refined lustre, rich colour and a smooth hand to SUPIMA cotton, Giza cotton, long-staple cotton, cotton-linen and ramie fabrics.', 'Мерсеризация придаёт хлопку SUPIMA, Giza, длинноволокнистому хлопку, хлопко-льняным и рами-смесям деликатный блеск, насыщенный цвет и гладкость.']
  ]
};

function buildMisc(route) {
  const src = routeFile('', route);
  if (!fs.existsSync(src)) return;
  let html = fs.readFileSync(src, 'utf8');
  const [title, desc] = miscMeta[route];
  html = localizeLinks(html);
  html = setMeta(html, route, title, desc);
  html = replacePairs(html, miscPhrases);
  html = replacePairs(html, miscRoutePhrases[route] || []);
  html = translateVisible(html);
  if (route === 'company/overview') {
    html = html
      .replace('aria-label="HLC facilities and production capacity"', 'aria-label="Производственные мощности HLC"')
      .replace('src="/motion-preview/"', 'src="/ru/motion-preview/"')
      .replace('title="Animated HLC facilities and production capacity"', 'title="Производственные мощности HLC в цифрах"');
  }
  html = fixJson(html, route);
  const out = routeFile('ru', route);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
}

function buildRussianMotionPreview() {
  const srcDir = path.join(root, 'motion-preview');
  const outDir = path.join(root, 'ru', 'motion-preview');
  let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
  html = html
    .replace('<html lang="en">', '<html lang="ru">')
    .replace('<title>HLC Facilities and Production Capacity</title>', '<title>Производственные мощности HLC</title>')
    .replace('At our own manufacturing base, fabric R&amp;D, knitting, dyeing, waterless dyeing, mercerization, liquid ammonia finishing and inspection are managed within one production system. Buyers work with the same accountable factory team from material selection and sampling through bulk production and shipment.', 'На собственной производственной площадке HLC разработка тканей, вязание, крашение, маловодное крашение, мерсеризация, отделка жидким аммиаком и контроль качества объединены в единую производственную систему. От выбора сырья и изготовления образцов до серийного производства и отгрузки заказ сопровождает одна ответственная команда фабрики.')
    .replace('FACTORY AREA', 'ПЛОЩАДЬ ФАБРИКИ')
    .replace('Animated isometric view of the HLC factory', 'Анимированная изометрическая схема фабрики HLC')
    .replace('MONTHLY CAPACITY', 'МЕСЯЧНАЯ МОЩНОСТЬ')
    .replace('/ month', '/ месяц')
    .replace('Animated integrated textile production line', 'Анимированная схема интегрированной текстильной линии')
    .replace('PRODUCTION HOURS', 'РЕЖИМ ПРОИЗВОДСТВА')
    .replace('CONTINUOUS PRODUCTION', 'НЕПРЕРЫВНОЕ ПРОИЗВОДСТВО')
    .replace('/ day', '/ сутки')
    .replace(/THREE-SHIFT OPERATION/g, 'РАБОТА В ТРИ СМЕНЫ')
    .replace('Animated clock and production gears', 'Анимированные часы и производственные механизмы');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  fs.copyFileSync(path.join(srcDir, 'preview.css'), path.join(outDir, 'preview.css'));
}

function addRuAlternate(file, route) {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  html = injectAlternates(html, route);
  fs.writeFileSync(file, html, 'utf8');
}

for (const route of Object.keys(catalogMeta)) buildCatalog(route);
const productsRoot = path.join(root, 'textile', 'products');
const slugs = fs.readdirSync(productsRoot).filter(s => s !== 'product-template' && fs.existsSync(path.join(productsRoot, s, 'index.html')));
for (const slug of slugs) buildProduct(slug);
for (const route of Object.keys(miscMeta)) buildMisc(route);
buildRussianMotionPreview();

const allRoutes = [...Object.keys(catalogMeta), ...slugs.map(s => `textile/products/${s}`), ...Object.keys(miscMeta)];
for (const route of allRoutes) {
  for (const prefix of ['', 'zh', 'ko', 'ja', 'ru']) addRuAlternate(routeFile(prefix, route), route);
}

let sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const activeRuUrls = new Set(allRoutes.map(route => routeUrl(route, 'ru')));
sitemap = sitemap.replace(/\s*<url><loc>https:\/\/hlctex\.com\/ru\/[^<]*<\/loc>[\s\S]*?<\/url>\s*/g, block => {
  const match = block.match(/<loc>([^<]+)<\/loc>/);
  return match && activeRuUrls.has(match[1]) ? `\n${block.trim()}\n` : '\n';
});
for (const route of allRoutes) {
  const u = routeUrl(route, 'ru');
  if (!sitemap.includes(`<loc>${u}</loc>`)) {
    const priority = route === '' ? '1.0' : route.includes('/products/') ? '0.7' : '0.8';
    const freq = route.includes('/products/') ? 'monthly' : 'weekly';
    sitemap = sitemap.replace('</urlset>', `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>\n</urlset>`);
  }
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Russian site generated: ${Object.keys(catalogMeta).length} catalog pages, ${slugs.length} product pages, ${Object.keys(miscMeta).length} company/contact/process pages.`);
