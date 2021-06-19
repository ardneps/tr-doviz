const fetch = require("node-fetch");

const from = "TRY";
const to = "USD,EUR,CHF,SEK,RUB,GBP,JPY,CNY";
const url = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;

module.exports = async () => {

    const response = await fetch(url, { method: "GET" });

    const data = (await response.json());

    if (data.error) throw new TypeError("Sonuç bulunamadı!");
    
    const { rates, date, amount } = data;

    const { USD, EUR, CHF, SEK, RUB, GBP, JPY, CNY } = rates;

    const array = date.split("-");
    const newdate = `${array[2]}.${array[1]}.${array[0]}`;
 
    const dollar = 1 / USD;
    const euro = 1 / EUR;
    const frank = 1 / CHF;
    const kron = 1 / SEK;
    const ruble = 1 / RUB;
    const sterlin = 1 / GBP;
    const yen = 1 / JPY;
    const yuan = 1 / CNY;

    const ardneps = {
        tarih: newdate,
        baz: "TL",
        miktar: amount,
        dolar: dollar,
        euro: euro,
        frank: frank,
        kron: kron,
        ruble: ruble,
        sterlin: sterlin,
        yen: yen,
        yuan: yuan
    };

    return ardneps;

};