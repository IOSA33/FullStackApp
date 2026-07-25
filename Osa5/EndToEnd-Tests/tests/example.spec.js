const { test, expect, beforeEach, describe } = require('@playwright/test')
const { testLogin, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await testLogin(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await testLogin(page, 'mluukkai', 'salainen1')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })

      describe('When logged in', () => {
        beforeEach(async ({ page }) => {
          await testLogin(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({ page }) => {
          await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')

          await expect(page.getByText('a new blog testTitle by testAuthor added')).toBeVisible()
        })

        test('blog can like', async ({ page }) => {
          await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')

          await page.getByRole('button', { name: 'view'}).click()
          await page.getByRole('button', { name: 'like'}).click()

          await expect(page.getByText('likes 1')).toBeVisible()
        })


      })
  })
})