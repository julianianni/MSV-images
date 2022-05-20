import { ICategory } from './Main'
import { Product } from './Product'
import { isEmpty } from 'lodash/fp'
import styles from './box.module.css'

interface IBox {
  category: ICategory
}

export const Box = ({ category }: IBox) => {
  const { name, products } = category

  return (
    <>
      <div className={styles.boxContainer}>
        <p className={styles.title}>{name}</p>
        <div className={styles.productsContainer}>
          {!isEmpty(products) ? (
            products.map((product, idx) => (
              <Product key={idx} product={product} />
            ))
          ) : (
            //this should be handled different, leave as it is for timing reasons
            <p>No products...</p>
          )}
        </div>
      </div>
    </>
  )
}
