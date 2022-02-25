// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { interpolate, tokenize } from "../src";

const AR =
  'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.';
const AR_MARK: AnyObject = ["لصفحة ما سيلهي", "السنين"];

const RU =
  "Лорем ипсум долор сит амет, сеа оптион пертинах оцурререт ех, еа меи суас легере риденс, еу нам ностер ехпетенда. Мел иусто путент медиоцрем те. Ерос лаудем иус ад. Ад инцоррупте медиоцритатем сит. Симул нецесситатибус еу вел. Алияуип молестиае еу хис. Цум ад тимеам инвидунт, нумяуам модератиус ад вим.\n" +
  "\n" +
  "Ет иллум феугиат репудиаре меи. Мел цу неморе утамур диссентиет, не еос иллуд партиендо, яуем идяуе иус не. Дицо долор вивендо еа яуо, меи лабитур форенсибус ад. Орнатус дебитис апеириан усу те, мутат етиам нец еа. Еи вис дицунт воцент импетус, те орнатус импедит перицулис меи.";
const RU_MARK: AnyObject = ["пертинах", "апеириан"];

const ES =
  "Kian stopi malantaŭ iv pre. Sia ot eviti malebligi, plua filo fiksi jo un'. Al pre makro lasta, des pago adjektivo nu. I vic plua grupa eŭro. Ie veka nenii hot, eksa personalo, propozicio nu eca, pri nv mini kver interñacia. Nu pre mallongigo praantaŭhieraŭ, i per dolaro festonomo profitanto.\n" +
  "\n" +
  "Ajn he jota glota, tre er geedzo frazenkondukilo. Sin bo ador hola infra. Infra antaŭpriskribo dz unu. Sola subtegmento por uj, denta kvintiliono hop sh, mo fojo laringalo transitiva baf. Tago multe kialo e tri, pri cento poezio ot, ojd minimume eksteren co.";
const ES_MARK = ["stopi malantaŭ", "kver interñacia."];

describe("interpolation test", () => {
  it("should interpolate", (done) => {
    expect(interpolate("Blank: ${firstName} ${lastName}", {})).toBe("Blank:  ");
    expect(
      interpolate("Fullname: ${firstName} ${lastName}", { firstName: "Cary", lastName: "Grant" })
    ).toBe("Fullname: Cary Grant");
    done();
  });

  it("should tokenize", (done) => {
    console.log(tokenize(ES, ES_MARK));
    console.log(tokenize(RU, RU_MARK));
    console.log(tokenize(AR, AR_MARK));
    done();
  });
});
