const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "717820910:AAGLJ65NDBO16XNIxY3Zs4hGjiMoJl-DrBI";
const fs = require("fs")
console.log("Bot has been started..")

const bot = new TelegramBot(TOKEN, {
    polling:{
        interlval:300,
        autoStart: true,
        params:{
            timeout:10
        }
    }
});

const arr =["null","null","null","null","null","null","null","null"];



bot.onText(/\/start/,msg=>{
    const {id} = msg.chat;

    bot.sendMessage(id,"Вкажіть ім'я і фамілію пацієнта")
    bot.on("message", async msg=>{
        if(arr[0]=="null"){
            getName(id,msg)
        }else if(arr[0]!="null"&&arr[1]=="null"){
            getAge(id,msg)
        }else if(arr[1]!="null"&&arr[2]=="null"){
            getGender(id,msg)
        }else if(arr[2]!="null"&&arr[3]=="null"){
            getDiagnosis(id,msg)
        }else if(arr[3]!="null"&&arr[4]=="null"){
            getHelp(id,msg)
        }else if(arr[4]!="null"&&arr[5]=="null"){
            getResult(id,msg)
        }else if(arr[5]=='Хибний виклик'){
            setComplaint(id,msg)
        }
    });



});
let temp = "";
async function getName(id,msg) {
        if(msg.text!="так"&&msg.text!="ні"){
            bot.sendMessage(id,`Ім'я і фамілія пацієнта - ${msg.text}, вірно?`,{
                reply_markup:{
                    keyboard:[
                        ["так", "ні"]
                    ]
                }
            })
            temp = msg.text;
        }else if(msg.text == "так") {

            arr[0]= temp;
            await bot.sendMessage(id,'Дякуємо! Тепер введіть вік пацієнта!',{reply_markup:{remove_keyboard:true}});
  //          getAge(id,msg)
    }else if(msg.text=="ні"){
            bot.sendMessage(id,"Помилились? Тоді введіть ім'я ще раз",{reply_markup:{remove_keyboard:true}});
        }
        }

async function getAge(id,msg){
    if(msg.text!="так"&&msg.text!="ні"){
        bot.sendMessage(id,`Вік пацієнта - ${msg.text}, вірно?`,{
            reply_markup:{
                keyboard:[
                    ["так", "ні"]
                ]
            }

        });
        temp = msg.text;
    }else if(msg.text == "так") {
        arr[1] = temp;
       await bot.sendMessage(id,'Дякуємо! Запит про вік прийнято!',{reply_markup:{remove_keyboard:true}});
       await bot.sendMessage(id,"Тепер вкажіть стать пацієнта",{
            reply_markup:{
                keyboard:[
                    ["Чоловіча", "Жіноча"]
                ]
            }
        })
//
    }else if(msg.text=="ні"){
        bot.sendMessage(id,"Помилились? Тоді введіть вік ще раз",{reply_markup:{remove_keyboard:true}});
    }
};

async function getGender(id,msg){
    if(msg.text!="так"&&msg.text!="ні"){
        bot.sendMessage(id,`Стать пацієнта - ${msg.text}, вірно?`,{
            reply_markup:{
                keyboard:[
                    ["так", "ні"]
                ]
            }
        });
        temp = msg.text;
    }else if(msg.text == "так") {
        arr[2] = temp;
        await bot.sendMessage(id,'Дякуємо! Запит прийнято!',{reply_markup:{remove_keyboard:true}});
        await  bot.sendMessage(id,"Тепер вкажіть діагноз")
//
    }else if(msg.text=="ні"){
        bot.sendMessage(id,"Помилились? Тоді вкажіть стать ще раз",{
            reply_markup:{
                keyboard:[
                    ["Чоловіча", "Жіноча"]
                ]
            }
        });
    }
}

async function getDiagnosis(id,msg) {
    if(msg.text!="так"&&msg.text!="ні"){
        bot.sendMessage(id,`'Діагноз - ${msg.text}, вірно?`,{
            reply_markup:{
                keyboard:[
                    ["так", "ні"]
                ]
            }
        });
        temp = msg.text;
    }else if(msg.text == "так") {
        arr[3] = temp;
        await bot.sendMessage(id,'Дякуємо! Тепер вкажіть надану допомогу!',{
            reply_markup:{
                keyboard:[
                    ["Кардиостимуляція ", "Дефібриляція "],
                    ["Компресія грудної клітини", "Джуг"],
                    ["Імболізація", "Пов'язка"]
                ]
            }
        });
        //          getAge(id,msg)
    }else if(msg.text=="ні"){
        bot.sendMessage(id,"Помилились? Тоді введіть діагноз ще раз",{reply_markup:{remove_keyboard:true}});
    }
}

async function getHelp(id,msg){
    if(msg.text!="так"&&msg.text!="ні"){
        bot.sendMessage(id,`Надана допомога - ${msg.text}, вірно?`,{
            reply_markup:{
                keyboard:[
                    ["так", "ні"]
                ]
            }
        });
        temp = msg.text;
    }else if(msg.text == "так") {
        arr[4] = temp;
       await bot.sendMessage(id,'Дякуємо! Тепер вкажіть результат!',{
            reply_markup:{
                keyboard:[
                    ["Покращення", "Без змін"],
                    ["Погіршення", "Хибний виклик"],
                    ["Смерть до приїду бригади", "Смерть в присутності бригади"]
                ]
            }
        });

}else if(msg.text=="ні"){
        bot.sendMessage(id,"Помилились? Тоді вкажіть надану допомгу ще раз",{
            reply_markup:{
                keyboard:[
                    ["Кардиостимуляція ", "Дефібриляція "],
                    ["Компресія грудної клітини", "Джуг"],
                    ["Імболізація", "Пов'язка"]
                ]
            }
        });
    }
}

async function getResult(id,msg){
    if(msg.text!="так"&&msg.text!="ні"){
        bot.sendMessage(id,`Результат - ${msg.text}, вірно?`,{
            reply_markup:{
                keyboard:[
                    ["так", "ні"]
                ]
            }
        });
        temp = msg.text;
    }else if(msg.text == "так") {
        arr[5] = temp;
        if(temp=="Хибний виклик"){
            console.log(temp);
            console.log(arr[5])
            bot.sendMessage(id, "Вкажіть вашу скаргу",{reply_markup:{remove_keyboard:true}})


        }else {
            await bot.sendMessage(id,'Дякуємо! Всі дані отримано!',{reply_markup:{remove_keyboard:true}});
            await console.log(arr)
        }




    }else if(msg.text=="ні"){
        await bot.sendMessage(id,"Помилились? Тоді вкажіть результат у ще раз",{
            reply_markup:{keyboard:[
                ["Покращення", "Без змін"],
                ["Погіршення", "Хибний виклик"],
                ["Смерть до приїду бригади", "Смерть в присутності бригади"]
            ]}

    })
    }
}

async function setComplaint(id,msg) {
    if(msg.text!="так"&&msg.text!="ні"){
        bot.sendMessage(id,`Ваша скарга: - ${msg.text}, вірно?`,{
            reply_markup:{
                keyboard:[
                    ["так", "ні"]
                ]
            }
        });
        temp = msg.text;
    }else if(msg.text == "так") {
        arr[5] = temp;
        await bot.sendMessage(id,'Дякуємо! Всі дані отримано!',{reply_markup:{remove_keyboard:true}});

    }else if(msg.text=="ні"){
        bot.sendMessage(id,"Помилились? Тоді напишіть скару ще раз!",);
    }

}