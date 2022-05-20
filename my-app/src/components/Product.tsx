import React from 'react'
import { IProducts } from './Main'
import styles from './product.module.css'

interface IProduct {
  product: IProducts
}

export const Product = ({ product }: IProduct) => {
  return (
    <a
      className={styles.link}
      href={product.url}
      target='_blank'
      rel='noreferrer'
    >
      <img src={product.logo} alt={product.name} height={50} width={50} />
      <p className={styles.productName}>{product?.name ?? ''}</p>
    </a>
  )
}
