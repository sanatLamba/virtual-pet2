var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var food;
var addFoodS;
function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  var food = new Food;
  textSize(20); 

  feed =  createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
}

function draw() {
  background(46,139,87);

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  if(lastFed>=12){
    text("last feed :" +lastFed%12 +"PM",350,30);
   }
   else if(lastFed == 0){
    text("last fed : 12 AM",350,30);
   }
   else{
       text("last fed :" +lastFed +"AM",350,30)
   }

   feedTime = database.ref('feedTime');
   feedTime.on("value",function(){
     lastFed = data.val();
   })
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage("images/happy dog.png");
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
      food: foodObj.getFoodStock(),
      feedTime: hour
  });
 }
 function addFoods(){
  foodS++
  database.ref('/').update({
      food:foodS
  });
 }
