import React, { useEffect, useState } from 'react'
import { Box } from './Box'
import styled from 'styled-components'
import axios from 'axios'
import { get, isEmpty } from 'lodash/fp'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  background-image: linear-gradient(147deg, #000000 0%, #434343 74%);
`

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 100%;
  justify-content: space-between;
  padding-top: 10rem;
`

export interface IProducts {
  id: string
  name: string
  url: string
  logo: string
}

export interface ICategory {
  products: IProducts[]
  name: string
  id: string
}

const CATEGORIES_URL =
  'https://egld.community/api/categories?&includeProducts=5&page=1'

export const Main = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async () => {
    setIsLoading(true)
    const categoriesFetched = await axios
      .get(CATEGORIES_URL)
      .then(get('data'))
      .catch((e) => {
        throw new Error('failed to fetch products')
      })
      .finally(() => setIsLoading(false))
    if (isEmpty(categoriesFetched)) return
    setCategories(categoriesFetched?.data ?? [])
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Container>
      {isLoading ? (
        <p>loading....</p> //this should be a  spinner or similar, simplyfing for example purpose
      ) : (
        <CategoriesContainer>
          {categories.map((category) => (
            <Box key={category.id} category={category} />
          ))}
        </CategoriesContainer>
      )}
    </Container>
  )
}
