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
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 15px 5px;
  padding: 0;
  transition: 0.2s;
  border: 2px solid #555856;
  :hover {
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid white;
  }
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
  background: #8c9089;
  transform: translateY(-15px);
  border-radius: 5px;
  padding: 5px;
  border: none;
  font-weight: 500;
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
