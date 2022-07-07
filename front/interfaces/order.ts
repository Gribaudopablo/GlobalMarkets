export interface IOrder{
    // {_id?:string;
    // orderImtems: IOrderItems[]}


    //     export interface  IOrderItems: [{
    //     id:     {type:String }
    //     title:  {type:String }
    //     size:   {type:String }
    //     quantity:{type:Number}
    //     slug:   {type:String}
    //     image:  {type:String}
    //     price:  {type:Number}
    // }]
    //  shippingAddress:{
    //     firstName:       {type: String}
    //     lastName:        {type: String}
    //     address:         {type: String}
    //     address2:        {type: String}
    //     zip:             {type: String}
    //     city:            {type: String}
    //     country:         {type: String}
    //     phone:           {type: String}
    // }

    //     numberOfItems: {type:Number }
    //     subTotal: {type:Number}
    //     tax:{type:Number }
    //     total:{type:Number }
    //     isPaid: {type: false}
    //     paidAt:{type:String}
    
    orderItems:IOrderItem[]

}

export interface IOrderItem{
    id:     {type:String }
    title:  {type:String }
    size:   {type:String }
    quantity:{type:Number}
    slug:   {type:String}
    image:  {type:String}
    price:  {type:Number}


}