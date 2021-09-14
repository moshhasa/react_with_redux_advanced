import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS =[
  {id: 1, title : 'Test 1 ', price : 10.99, description: 'My first product'},
  {id: 2, title : 'Test 2 ', price : 5.99, description: 'My second product'},
  {id: 3, title : 'Test 3 ', price : 5.99, description: 'My third product'}
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {
          DUMMY_PRODUCTS.map(p => <ProductItem key={p.id} product={p}/>)
        }
        
      </ul>
    </section>
  );
};

export default Products;
