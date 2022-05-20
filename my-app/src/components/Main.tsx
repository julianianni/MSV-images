import React, { useEffect, useState } from 'react'
import { Box } from './Box'
import styles from './main.module.css'
import axios from 'axios'
import { get, isEmpty } from 'lodash/fp'
import { CATEGORIES_URL, TOTAL_TAKE, PRODUCTS_PER_CATEGORY } from '../constants'

export interface IProducts {
  id: string
  name: string
  url: string
  logo: string
  slug: string
}

export interface ICategory {
  products: IProducts[]
  name: string
  id: string
  slug: string
}

export const generateURL = ({
  url,
  currentPage = 1,
}: {
  url: string
  currentPage?: number
}): string => {
  const page = `&page=${currentPage}`
  const totalTake = `&take=${TOTAL_TAKE}`
  const productsPerCategory = `&includeProducts=${PRODUCTS_PER_CATEGORY}`
  return url + '/categories?' + totalTake + page + productsPerCategory
}

export const Main = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
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
    setTotalPages(categoriesFetched?.meta?.pageCount ?? 1)
    setCategories(categoriesFetched?.data ?? [])
  }

  const handleNext = () => {
    if (totalPages === currentPage) setCurrentPage(1)
    else setCurrentPage((prevPage) => prevPage + 1)
  }
  const handlePrevious = () => {
    if (currentPage === 1) setCurrentPage(totalPages)
    else setCurrentPage((prevPage) => prevPage - 1)
  }

  useEffect(() => {
    getProducts(generateURL({ url: CATEGORIES_URL, currentPage }))
  }, [currentPage])

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>loading....</p> //this should be a  spinner or similar, simplyfing for example purpose
      ) : (
        <div className={styles.subContainer}>
          <span className={styles.arrow} onClick={() => handlePrevious()}>
            {'<'}
          </span>
          <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <Box key={category.id} category={category} />
            ))}
          </div>
          <span className={styles.arrow} onClick={() => handleNext()}>
            {'>'}
          </span>
        </div>
      )}
    </div>
  )
}
