import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/",async (req, res) => {
    
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
        const content = response.data;
        const instructions = content.drinks[0].strInstructions;
        const ingredients = [];

        const drinks = content.drinks[0]
        const imageURl = drinks.strDrinkThumb;
        const drinkName = drinks.strDrink;
        // console.log(imageURl);

        for(let i =1; drinks[`strIngredient${i}`]!=null; i++) {

                ingredients.push(drinks[`strIngredient${i}`]);

        }

    res.render("index.ejs", {drinkName,instructions, ingredients, imageURl});
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});
