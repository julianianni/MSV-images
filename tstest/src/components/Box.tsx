import { ICategory, IProducts } from './Main'
import { Product } from './Product'
import { isEmpty, get } from 'lodash/fp'
import styles from './box.module.css'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { CATEGORIES_URL, PRODUCTS_PER_CATEGORY } from '../constants'

interface IBox {
  category: ICategory
}

export const Box = ({ category }: IBox) => {
  const { name, products, slug } = category
  const [groupedProducts, setGroupedProducts] = useState<IProducts[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // console.log(products)

  const fetchProductsBySlug = async () => {
    if (products.length !== PRODUCTS_PER_CATEGORY) {
      setIsLoading(false)
      setGroupedProducts(products)
    } else {
      const fetchedProducts = await axios
        .get(`${CATEGORIES_URL}/products?category=${slug}`)
        .then(get('data'))
        .then(get('data'))
        .catch((err) => console.log(err)) //error should be handled here
      setGroupedProducts(fetchedProducts)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProductsBySlug()
  }, [products])

  console.log(groupedProducts)

  return (
    <>
      {isLoading ? (
        <p>Loading....</p> //not part of the scope but this needs to be handled better
      ) : (
        <div
          className={styles.boxContainer}
          style={{ width: `${groupedProducts.length * 33}px` }}
        >
          <p className={styles.title}>{name}</p>
          <div className={styles.productsContainer}>
            {!isEmpty(groupedProducts) ? (
              groupedProducts.map((product, idx) => (
                <Product key={idx} product={product} />
              ))
            ) : (
              //this should be handled different, leave as it is for timing reasons
              <p>No products...</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
