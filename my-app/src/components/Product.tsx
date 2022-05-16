import React from 'react'
import { IProducts } from './index'
import styled from 'styled-components'

interface IProduct {
  product: IProducts
}

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Image = styled.img``

const ProductName = styled.p`
  margin-left: 5px;
`

const Link = styled.a`
  text-decoration: none;
  padding: 10px;
`

export const Product = ({ product }: IProduct) => {
  return (
    <Link href={product.url} target='_blank' rel='noreferrer'>
      <ProductContainer>
        <Image src={product.logo} alt={product.name} height={50} width={50} />
        <ProductName>{product?.name ?? ''}</ProductName>
      </ProductContainer>
    </Link>
  )
}
