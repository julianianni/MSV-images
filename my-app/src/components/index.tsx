import React, { useEffect, useState } from 'react'
import { Box } from './Box'
import styled from 'styled-components'
import axios from 'axios'
import { get, isEmpty } from 'lodash/fp'

const Container = styled.div`
  animation: scroll 70s linear infinite;
  background: url('https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'),
    #111111;
  color: #eee;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  perspective-origin: 50% 50%;
  overflow: hidden;

  @keyframes scroll {
    100% {
      background-position: 0px -3000px;
    }
  }

  @media (prefers-reduced-motion) {
    .wrapper {
      animation: scroll 200s linear infinite;
    }
  }

  @media (min-width: 670px) {
    .title {
      font-size: 5rem;
    }
  }
`

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 100%;
  justify-content: space-between;
  padding: 1rem;
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

const StlyedBtn = styled.button`
  border-radius: 5px;
  border: none;
  width: 200px;
  height: 30px;
  background: white;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

const SubContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CATEGORIES_URL =
  'https://egld.community/api/categories?&includeProducts=5&page=1'

const CRYPTO_URL =
  'https://www.cryptoatlas.io/api/categories?take=100&includeProducts=5&page=1'

export const Main = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [currentURL, setCurrentUrl] = useState<
    typeof CATEGORIES_URL | typeof CRYPTO_URL
  >(CATEGORIES_URL) //adding a simple toggle button to demonstrate reusability between API calls
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async (url: string) => {
    setIsLoading(true)
    const categoriesFetched = await axios
      .get(url)
      .then(get('data'))
      .catch((e) => {
        throw new Error('failed to fetch products')
      })
      .finally(() => setIsLoading(false))
    if (isEmpty(categoriesFetched)) return
    setCategories(categoriesFetched?.data ?? [])
  }

  const handleClick = () => {
    if (currentURL === CATEGORIES_URL) setCurrentUrl(CRYPTO_URL)
    else setCurrentUrl(CATEGORIES_URL)
  }

  useEffect(() => {
    getProducts(currentURL)
  }, [currentURL])

  return (
    <Container>
      {isLoading ? (
        <p>loading....</p> //this should be a  spinner or similar, simplyfing for example purpose
      ) : (
        <SubContainer>
          <StlyedBtn onClick={handleClick}>Toggle categories</StlyedBtn>
          <CategoriesContainer>
            {categories.map((category) => (
              <Box key={category.id} category={category} />
            ))}
          </CategoriesContainer>
        </SubContainer>
      )}
    </Container>
  )
}
