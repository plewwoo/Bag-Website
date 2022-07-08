module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.img = oldCart.img;

    this.add = ((item, id, img)=>{
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0, img}
        }
        storedItem.qty++;
        storedItem.price = parseInt(storedItem.item.price) * parseInt(storedItem.qty);
        this.totalQty++;
        this.totalPrice += parseInt(storedItem.item.price);
        console.log(typeof storedItem.item.price)
    })

    this.generateArray = (() =>{
        let arr = [];
        for (let id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    })


}