const getSentences = (fresh_text) => {
    var text = fresh_text;
    text = text.replace(/[\.!\?]+/g,".");//convert all sentence ends to period
    text = text.replace(/[0-9]\.[0-9]/g,"DECIM");//remove uses when number either side e.g. 37.2 degrees
    text = text.replace(/[^A-Za-z\.]/g, " ");
    text = text.replace(/\se\.g\.|\si\.e\.|\smr\.|\smrs\.|\sdr\.|\sms\.|\setc\.|\shwy\.|\srd\.|\sst\.|\spde\.|\scol\.|\sphd\.|\sbsc\.|\sc\.|\sca\.|\sb\.c\.|\sa\.d\.|\sb\.c\.e\.|\sb\.a\.|\scapt\.|\scent\.|\scorp\.|\scomdr\.|\scal\.|\sgal\.|\sdist\.|\sest\.|\set al\.|\sed\.|\sdiv\.|\sdec\.|\sjan\.|\sfeb\.|\smar\.|\sapr\.|\sjun\.|\sjul\.|\saug\.|\ssept\.|\soct\.|\snov\.|\sgov\.|\slat\.|\sm\.d\.|\smg\.|\smt\spl\.|\spop\.|\srev\.|\sr\.n\.|\svol\.|\ssr\.|\ssgt\.|\suniv\.|\svs\.|\swt\./gi,"ABBRV");
    var sentenceArray = text.split(".");
    lastChar =  fresh_text.trim().slice(-1);
    if( lastChar == "." || lastChar == "?" || lastChar == "!"){ sentenceArray.pop(); }
    return sentenceArray;
}

const sentences = (text) => {
    let sentences = getSentences(text)

    return [...sentences]
}

module.exports = sentences