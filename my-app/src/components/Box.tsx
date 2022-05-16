import React from 'react'
import { ICategory } from './index'
import { Product } from './Product'
import styled from 'styled-components'
import { isEmpty } from 'lodash/fp'

interface IBox {
  category: ICategory
}

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 5px;
  padding: 0;
  transition: 1s;
  border: 1px solid #333;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  max-width: 450px;
`

const Title = styled.p`
  margin: 0;
  padding: 0;
`

export const Box = ({ category }: IBox) => {
  const { name, products } = category

  return (
    <>
      {!isEmpty(products) && (
        <BoxContainer>
          <Title>{name}</Title>
          <ProductsContainer>
            {products.map((product, idx) => (
              <Product key={idx} product={product} />
            ))}
          </ProductsContainer>
        </BoxContainer>
      )}
    </>
  )
}
