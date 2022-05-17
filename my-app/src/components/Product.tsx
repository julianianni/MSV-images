import React from 'react'
import { IProducts } from './index'
import styled from 'styled-components'

interface IProduct {
  product: IProducts
}

const Image = styled.img``

const ProductName = styled.p`
  margin-left: 5px;
`

const Link = styled.a`
  display: flex;
  box-sizing: border-box;
  text-decoration: none;
  color: white;
  font-weight: 700;
  padding: 5px;
  &:hover {
    border-radius: 10px;
    background: rgba(100, 100, 100, 0.5);
  }
`

export const Product = ({ product }: IProduct) => {
  return (
    <Link href={product.url} target='_blank' rel='noreferrer'>
      <Image src={product.logo} alt={product.name} height={50} width={50} />
      <ProductName>{product?.name ?? ''}</ProductName>
    </Link>
  )
}
