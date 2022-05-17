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
  flex-grow: 1;
`

const Title = styled.p`
  margin: 0;
  background: #8c9089;
  transform: translateY(-15px);
  border-radius: 5px;
  padding: 5px 15px;
  border: none;
  font-weight: 500;
  font-size: 24px;
`

export const Box = ({ category }: IBox) => {
  const { name, products } = category

  return (
    <>
      <BoxContainer>
        <Title>{name}</Title>
        <ProductsContainer>
          {!isEmpty(products) ? (
            products.map((product, idx) => (
              <Product key={idx} product={product} />
            ))
          ) : (
            //this should be handled different, leave as it is for timing reasons
            <p>No products...</p>
          )}
        </ProductsContainer>
      </BoxContainer>
    </>
  )
}
