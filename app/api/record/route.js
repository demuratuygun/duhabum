import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const serviceAccount = {
  "type": "service_account",
  "project_id": "fresh-sequence-439713-u2",
  "private_key_id": "0f21d3a537cb17f0c74bd29547e6246962ad13ec",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC1Vg0SyHjKk6v8\n1bTQ1FBfe8zi4mM9jGILlhR8yjk2Uh/1/0X+TfAUltelJ2oaWId0wC0xkWMQvePI\nE58Xi1zqg1fulhqwvp6nsfQJv4udryL1kzYh5MqTbbEAAe+GQLx+BsBXS2Ur2Og/\nmBplFQ36/rlYQJGrHFIY45YeI9MggW24sJuy1namdccjSBflL5eFrhE8ZxUsHz/0\nyfilhgJsf2jLel376U2tnyoRAmVDZoJXqwyp8SHFD2r08OGz/s4hEx1ST0lFxjiv\nBy5//L8QM5ul/nWZo+npnzy2rBBDHD6Z4P8DpDsstRO3ww5omm5cNAuBuoHIGRaM\nod6NZNgVAgMBAAECggEAJLBTJ1J7zALaSKbFdX4Lf/Iop1wGF7kcSjtUjFYPAsxV\nbpx2QShsM4I8gcwKdeelCmxqiG2hxUyiNkQwC1+1TjaCV0G0B0AeEhBZb5J7cU0y\nzcx55pwnl3IZXobFu1xENtxvVIoq31b80IcaCgsbP8YDYpV3047AlowPfqwhZqEp\nEx4wTNU4vxw6BXifYZ3C//2f0tdctTKGa0cU7Mghpl1JiLOyivZMIBZvII/Fgjli\nAq7hIooOtqGn/BPasJVZf04xwPD1npyuDSee2r+8u/HkHdAm1daAvoWS9OPSJMgw\np8TH9evqvq99d8EFVts/PoUm1JA+ZWNSlKyEpcIoKQKBgQD6R3FxunoZ0wubeLK/\n2jxdE7AIaJlPOA9QJbhILRmeMRNru8RJj+gbjQvWNc59nR1svctaBCfXXBd5DTX3\nT74EeWkia0cRpKvwnLWZLKTSd0qBiojeO+LLkHAJZ08I5NYAIJnIheWFiA1uzIIz\nvRfplliJS6pgpZLyhWNg802rrQKBgQC5eyzEMf2L7qbmz3/h+UqgdgZl1lp/a6qp\neV4Ifdjy4O2taZQpwKcJkQBPErm7T+j7RAKUIV5dujfD7BFMLjQhdoP1o4mAnwQ/\n5f9HgN3Udeo+pVJ9NfxqwiXe9xkgg1did35ZEfQ71hDAPOLviHZDCeBd+623D+iD\nVcuzwZrrCQKBgB8QGu5onJrz7K7hLh5NscxDk0eX499HL+9cnyCmKFXP9X8bkOMo\nb0BsIxn1F6nThEFo1QJZHbDHB0rI7vfA9+6KOxhAhFOWQpjcelWGivZsQ90MGqyq\ndh2Z0a35GoAaFs1xPmT66V/HYRNtYoOVZpBhTp/LulvAcRqUn57605sJAoGAeLWz\n5Z9PDfFrx0yFQnA15AXLlh0RWlmcgJzO2KHmPfKqW7AZT67kRnKKi+t42nFgA544\nO2UX/9GAF06b10M+hASYTpV2mDFk15z8LPGt7GYs40Y+T+SBeI0PjnKrdKBlj1yK\n6ranhwWCc0lsu0zJAkn8Lc3sOPXucQK2Bi9afdkCgYBUOkPaReJO2Ruo/u+Dh0Hj\nvODjPBGVx6IqjFw2+1VZas64fS0Qe4FlNxROto0sqGVykQaQew21VNQqfh4on2Zz\npUJKC4wZibigCyCtwYASHf1qWiINdgJtXYk9hbSpS8r32SYRLDeVkp7Mz5jxoKRl\nD6w/gzlnqeqrF1QP5USxYg==\n-----END PRIVATE KEY-----\n",
  "client_email": "duhabum-656@fresh-sequence-439713-u2.iam.gserviceaccount.com",
  "client_id": "111321054746566275104",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/duhabum-656%40fresh-sequence-439713-u2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

// Create a JWT client
const auth = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive'],
);



export async function POST(req) {
  try {

    const request = new NextRequest(req);
    const data = await request.json();
    console.log(data);

    await auth.authorize();
    console.log('Successfully authorized!');

    const docs = google.docs({ version: 'v1', auth });
    const drive = google.drive({ version: 'v3', auth });


    const createResponse = await docs.documents.create({
      requestBody: {
        title: data.name+" "+data.phone+(data.checkout?'':' (onaysız)'),
      },
    });

    const documentId = createResponse.data.documentId;

    let filldata = [
      
      {q: 'Duhabum Koçluk Hizmeti ile Hedefiniz Nedir?', a: !data.goal||data.goal==''?'cevaplanmadı':data.goal },
      {q: 'Duhabum Koçluğa Nereden Ulastiniz?', a: (data.reach??'belirtilmedi') },
      
      {q: 'Günde ortalama Kaç öğün tüketiyorsunuz?', a: (data.meals??'belirtilmedi')},
      {q: 'protein, yağ, karbonhidrat sebze veya yeşillik olarak sık tükettiğiniz gıdaları bütçeni dikkate alarak yazar mısın', 
        a: ('Protein: '+ (data.protein??'belirtilmedi')
        +', karbonhidrat: '+(data.carbohydrates??'belirtilmedi')
        +', sebze yeşillik: '+(data.vegetable??'belirtilmedi')
        +', yağlar: '+ (data.fats??'belirtilmedi') )
      },
      {q: 'Supplement Kullaniyor Musunuz? Kullandiklarinizi Yazar Misiniz?', a: !data.supplement||data.supplement==''?'belirtilmedi':data.supplement },
      {q: 'Toplam beslenme veya supplement için ayırdığın veya ayırabileceğin aylık bütçe', a: !data.budget||data.budget==''?'belirtilmedi':data.budget },
      {q: 'Besin Alerjiniz Var Mi?', a: !data.allergy||data.allergy==''?'belirtilmedi':data.allergy },
      {q: 'Kronik Hastaliginiz Var Mi?', a: !data.disease||data.disease==''?'belirtilmedi':data.disease },
      {q: 'Daha önce yaşadığınız bir sakatlık var mı?', a: !data.injury||data.injury==''?'belirtilmedi':data.injury },
      {q: 'Daha önce spor salonuna gittin mi gittiysen kaç ay', a: (data.GymHistory??'belirtilmedi')+' ay' },
      {q: 'kac aydir Aktif Olarak GYMe gidiyorsun?', a: (data.GymCurrently && data.GymCurrently>0? (data.GymCurrently+' aydır'):"şuan gitmiyorum" ) },
      {q: 'Her kas grubu icin formunu en iyi bildiğiniz 2 egzersiz yazar mısın', 
        a: ("göğüs: "+(data.chest??"belirtilmedi")
        +", omuz: "+(data.shoulder??'belirtilmedi')
        +", sırt: "+(data.back??'belirtilmedi')
        +"ön kol: "+(data.forearm??'belirtilmedi')
        +", arka kol: "+(data.reararm??'belirtilmedi')
        +", bacak: "+(data.leg??'belirtilmedi'))
      },
      {q: 'haftada kac gun kac dakika spora ayırmayı planlıyorsun', 
        a: "haftada "+(data.GymDaysinWeek??'belirtilmedi')+" gün, günde "+(data.GymTimeinDay??"belirtilmedi")+ "dakika" 
      },

    ];
    

    const activityLevels = [
      {level: 1, title:"Hareketsiz (Sedanter)", text: "Günün büyük kısmını oturarak geçiriyor", factor:1.4, value: 10, unit:"dk'dan az"},
      {level: 2, title:"Hafif Aktif", text: "Günlük rutini bazı yürüyüşler içeriyor. Öğrenci, ofis çalışanı", factor:1.5, value: 25, unit:"dk'dan a"},
      {level: 3, title:"Orta Düzeyde Aktif", text: "Görece hareketli veya gün içinde aktif olmayi gerektiren bir rutini var", factor:1.6, value: 40, unit:"dk'dan az"},
      {level: 4, title:"Çok Aktif", text: "Fiziksel olarak efor gerektiren bir rutini var", factor:1.8,  value: 60, unit:"dk'dan az"},
      {level: 5, title:"Son Derece Aktif", text: "fiziksel olarak zorlu bir rutini var", factor:2, value: 90, unit:"dk'dan çok "},
    ]
      

    let requests = [];

    

    let personalInfoText = `${data.name} ${data.email} ${data.phone}\n\n${data.gender} ${data.weight} kilo  ${data.height} cm  ${data.years} yaşında \n\nFiziksel aktivite durumu ${activityLevels[data.PAL-1]?.title || 'belirsiz'}: ${data.PAL} ${activityLevels[data.PAL-1]?.text || 'belirsiz'}\n\n`;
    
    let fullText = ``;

    if (data?.checkout?.option?.plan) {
      fullText += `${data.checkout.option.plan} ${data.checkout.option.duration} ay\n\n\n`;
    }

    fullText += `${personalInfoText}\n\n` +`Bazal metabolizma hızı: ${data.BMR} Toplam Günlük Enerji Harcaması: ${data.TDEE}\n\n`;

    filldata.forEach((question) => {
      fullText += `\n\n${question.q}\n${question.a}\n\n`;
    });

    requests.push({
      insertText: {
        location: { index: 1 },
        text: fullText,
      },
    });

    // Update the document with the questions and answers
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests,
      },
    });

    if( (data.email??"").length> 2 ) {
      await drive.permissions.create({
        fileId: documentId,
        requestBody: {
          role: 'writer', // or 'reader' based on the access level you want to grant
          type: 'user',
          emailAddress: data.email,
        },
      });
    }
    
    return NextResponse.json({ message: 'Document generate and updated successfully', documentId });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to generate and fill the document' }, { status: 500 });
  }
}


/*

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(req) {
  try {
    const { email } = await req.json(); // Assuming the request body contains the email address

    const docs = google.docs({ version: 'v1', auth: oAuth2Client });
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    // Create a new document
    const createResponse = await docs.documents.create({
      requestBody: {
        title: 'Sample Document',
      },
    });

    const documentId = createResponse.data.documentId;

    // Update the document with some text
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1,
              },
              text: 'Hello, this is a sample document.',
            },
          },
        ],
      },
    });

    // Share the document with the specified user
    await drive.permissions.create({
      fileId: documentId,
      requestBody: {
        role: 'writer', // or 'reader' based on the access level you want to grant
        type: 'user',
        emailAddress: email,
      },
    });

    return NextResponse.json({ message: 'Document created, updated, and shared successfully', documentId });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to create, fill, or share the document' }, { status: 500 });
  }
}


 */