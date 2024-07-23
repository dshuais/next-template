/*
 * @Author: dushuai
 * @Date: 2024-04-23 14:36:27
 * @LastEditors: dushuai
 * @LastEditTime: 2024-04-23 17:52:38
 * @description: 路由拦截 middleware 
 */
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { TOKEN_KEY } from "./common"

/**
 * 所有路由 手动维护 暂未发现好的方式
 */
const routes = ['/', '/login', '/user', '/user/about', '/user/users']

/**
 * 不需要鉴权的路由
 */
const whiteRoute = ['/login']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log('middleware', request);
  // console.log('middleware', NextResponse);
  const { pathname } = request.nextUrl

  if (routes.includes(pathname)) { // 路由拦截
    // console.log('pathname:>> ', pathname);

    const token = request.cookies.get(TOKEN_KEY);

    /**
     * 一个基础的鉴权
     * 无token时 进入除白名单外 重定向登录页
     * 有token时 进入白名单  重定向首页
     * 其他情况放行
     */
    if (token) {
      if (whiteRoute.includes(pathname)) return NextResponse.redirect(new URL('/', request.url))
      return NextResponse.next()
    } else {
      if (!whiteRoute.includes(pathname)) return NextResponse.redirect(new URL('/login', request.url))
      return NextResponse.next()
    }

  } else if (pathname.startsWith('/api')) { // 接口拦截 前提是 /api 开头
    console.log('接口拦截:>> ', pathname);
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
// 这个也可以不需要，在middleware中处理也可以。
export const config = {
  matcher: [
    // "/api/:path*",
    "/:path*" // 所有
  ]
}
