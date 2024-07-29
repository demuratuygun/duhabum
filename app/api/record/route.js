import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(req) {
  try {

    const request = new NextRequest(req);
    const data = await request.json();
    console.log(data)

    const docs = google.docs({ version: 'v1', auth: oAuth2Client });

    const createResponse = await docs.documents.create({
      requestBody: {
        title: data.name+" "+data.phone,
      },
    });

    const documentId = createResponse.data.documentId;

    

    let filldata = [
      
      {q: 'Duhabum Koçluk Hizmeti ile Hedefiniz Nedir?', a: !data.goal||data.goal==''?'cevaplanmadı':data.goal },
      {q: 'Duhabum Koçluğa Nereden Ulastiniz?', a: !data.reach||data.reach==''?'cevaplanmadı':data.reach },
      
      
      {q: 'Günde ortalama Kaç öğün tüketiyorsunuz?', a: !data.meals||data.meals==''?'cevaplanmadı':data.meals },
      {q: 'protein, yağ, karbonhidrat sebze veya yeşillik olarak sık tükettiğiniz gıdaları bütçeni dikkate alarak yazar mısın', a: 'Protein: '+!data.protein||data.protein==''?'cevaplanmadı':data.protein+', karbonhidrat: '+!data.carbohydrates||data.carbohydrates==''?'cevaplanmadı':data.carbohydrates+', sebze yeşillik: '+!data.vegetable||data.vegetable==''?'cevaplanmadı':data.vegetable+', yağlar: '+ !data.fats||data.fats==''?'cevaplanmadı':data.fats },
      {q: 'Supplement Kullaniyor Musunuz? Kullandiklarinizi Yazar Misiniz?', a: !data.supplement||data.supplement==''?'cevaplanmadı':data.supplement },
      {q: 'Toplam beslenme veya supplement için ayırdığın veya ayırabileceğin aylık bütçe', a: !data.budget||data.budget==''?'cevaplanmadı':data.budget },
      {q: 'Besin Alerjiniz Var Mi?', a: !data.allergy||data.allergy==''?'cevaplanmadı':data.allergy },
      {q: 'Kronik Hastaliginiz Var Mi?', a: !data.disease||data.disease==''?'cevaplanmadı':data.disease },
      {q: 'Daha önce yaşadığınız bir sakatlık var mı?', a: !data.injury||data.injury==''?'cevaplanmadı':data.injury },
      {q: 'Daha önce spor salonuna gittin mi gittiysen kaç ay', a: !data.GymHistory||data.GymHistory==''?'cevaplanmadı':data.GymHistory },
      {q: 'kac aydir Aktif Olarak GYMe gidiyorsun?', a: !data.GymCurrently||data.GymCurrently==''?'cevaplanmadı':data.GymCurrently },
      {q: 'Her kas grubu icin formunu en iyi bildiğiniz 2 egzersiz yazar mısın', a: "göğüs: "+!data.chest||data.chest==''?'cevaplanmadı':data.chest+", omuz: "+!data.shoulder||data.shoulder==''?'cevaplanmadı':data.shoulder+", sırt: "+!data.back||data.back==''?'cevaplanmadı':data.back
          +"ön kol: "+!data.forearm||data.forearm==''?'cevaplanmadı':data.forearm+", arka kol: "+!data.reararm||data.reararm==''?'cevaplanmadı':data.reararm+", bacak: "+!data.leg||data.leg==''?'cevaplanmadı':data.leg
       },
      {q: 'haftada kac gun kac dakika spora ayırmayı planlıyorsun', a: "haftada "+!data.GymDaysinWeek||data.GymDaysinWeek==''?'cevaplanmadı':data.GymDaysinWeek+" gün, günde "+!data.GymTimeinDay||data.GymTimeinDay==''?'cevaplanmadı':data.GymTimeinDay+ "dakika" },

    ];
    

    const activityLevels = [
      {level: 1, title:"Hareketsiz (Sedanter)", text: "Günün büyük kısmını oturarak geçirenler", factor:1.4, value: 10, unit:"dk'dan az"},
      {level: 2, title:"Hafif Aktif", text: "Günlük rutininiz bazı yürüyüşler içeriyorsa. Öğrenci, ofis çalışanı", factor:1.5, value: 25, unit:"dk'dan a"},
      {level: 3, title:"Orta Düzeyde Aktif", text: "Görece hareketli veya gün içinde ayakta olmayi gerektiren bir rutinin varsa, Öğretmen, Kasiyer", factor:1.6, value: 40, unit:"dk'dan az"},
      {level: 4, title:"Çok Aktif", text: "Fiziksel olarak efor gerektiren bir rutininiz varsa, temizlik görevlisi, perekende çalışanı", factor:1.8,  value: 60, unit:"dk'dan az"},
      {level: 5, title:"Son Derece Aktif", text: "fiziksel olarak zorlu bir rutininiz varsa, Profesyonel sporcular, ağır fiziksel işlerde çalışanlar", factor:2, value: 90, unit:"dk'dan çok "},
    ]
      

    let requests = [];

    let personalInfoText = `${data.gender}  ${data.weight} kilo  ${data.height} cm  ${data.years} yaşında \n\nFiziksel aktivite durumu ${activityLevels[data.PAL-1]?.title || 'belirsiz'}: ${data.PAL} ${activityLevels[data.PAL-1]?.text || 'belirsiz'}`;

    requests.push({
      insertText: {
        location: {
          index: 1,
        },
        text: personalInfoText + "\n\n",
      },
    });

    let currentIndex = personalInfoText.length + 3;

    filldata.reverse().forEach((question, index) => {
      requests.push({
        insertText: {
          location: {
            index: currentIndex,
          },
          text: `\n\n${question.q}\n${question.a}\n\n`,
        },
      });
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