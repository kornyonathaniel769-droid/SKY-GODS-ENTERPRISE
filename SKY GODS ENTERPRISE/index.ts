export interface  application {
    id:string;
    category:'iphone'|'Television'|
    'Laptop '|'Audio';
    brand :String;
    model:String;
    price:number;
    imageurl:String;
    isNewArrival:boolean;
}
export interface Testimonials {
name:String;
text:String;
stars:number;
}