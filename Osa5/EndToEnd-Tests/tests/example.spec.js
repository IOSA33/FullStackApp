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

    await page.goto('http://localhost:5173/login')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await testLogin(page, 'mluukkai', 'salainen')

      await expect(page.getByText('logout')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await testLogin(page, 'mluukkai', 'salainen1')

      await expect(page.getByText('logout')).not.toBeVisible()
    })

      describe('When logged in', () => {
        beforeEach(async ({ page }) => {
          await testLogin(page, 'mluukkai', 'salainen')
          await expect(page.getByText('logout')).toBeVisible()
          await page.goto('http://localhost:5173/create')
        })

        test('a new blog can be created', async ({ page }) => {
          await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')

          await expect(page.getByText('a new blog testTitle by testAuthor added')).toBeVisible()
        })

        test('blog can like', async ({ page }) => {
          await createBlog(page, 'testTitle1', 'testAuthor1', 'testUrl1')

          await page.getByRole('link', { name: 'testTitle1 by testAuthor1' }).first().click()
          await page.getByRole('button', { name: 'like'}).click()

          await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('user can delete blog', async ( {page} ) => {
          await createBlog(page, 'testTitle2', 'testAuthor2', 'testUrl2')
          
          await page.getByRole('link', { name: 'testTitle2 by testAuthor2' }).click()

          page.once('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm')
            expect(dialog.message()).toContain(`Remove blog testTitle2 by testAuthor2`)       
            await dialog.accept()
          })

          await page.getByRole('button', { name: 'remove'}).click()

          await expect(page.getByRole('link', { name: 'testTitle2 by testAuthor2' })).not.toBeVisible()
        })

        // test('user can see the remove button', async ( {page} ) => {
        //   await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')
          
        //   await page.getByRole('button', { name: 'view'}).click()
        //   await expect(page.getByRole('button', { name: 'remove'})).toBeVisible()
        // })

        // test('likes are in correct order', async ( {page} ) => {
        //   await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')
        //   await createBlog(page, 'testTitle1', 'testAuthor1', 'testUrl1')

        //   const blog1 = page.locator('.blog').filter({ hasText: /^testTitle / })
        //   const blog2 = page.locator('.blog').filter({ hasText: /^testTitle1 / })

        //   await blog1.getByRole('button', { name: 'view' }).click()
        //   await blog2.getByRole('button', { name: 'view' }).click()
          
        //   const likeButton1 = blog1.getByRole('button', { name: 'like' })
        //   const likeButton2 = blog2.getByRole('button', { name: 'like' })

        //   await likeButton1.click()
        //   await expect(blog1.getByText('likes 1')).toBeVisible()
        //   await likeButton1.click()
        //   await expect(blog1.getByText('likes 2')).toBeVisible()

        //   await likeButton2.click()
        //   await expect(blog2.getByText('likes 1')).toBeVisible()

        //   await expect(blog1.getByText('likes 2')).toBeVisible()
        //   await expect(blog2.getByText('likes 1')).toBeVisible()

        //   const blogs = page.locator('.blog')
        //   await expect(blogs.first()).toContainText('testTitle')            
        //   await expect(blogs.last()).toContainText('testTitle1')
        // })
      })
  })
})