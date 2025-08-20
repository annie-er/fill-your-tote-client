export class RestClient {

    static baseUrl = "http://localhost:8080"

    // cart
    static async getCartItems(): Promise<any> {
        const url = `${RestClient.baseUrl}/cart`
        const response = await fetch(url)
        return await response.json()
    }

    static async getCartSummary(): Promise<any> {
        const url = `${RestClient.baseUrl}/cart/summary`
        const response = await fetch(url)
        return await response.json()
    }

    static updateCartItemQuantity(itemId: string, quantity: number): Promise<any> {
        const url = `${RestClient.baseUrl}/cart/items/${itemId}`
        return fetch(
            url,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity })
            }
        )
    }

    static removeCartItem(itemId: string): Promise<any> {
        const url = `${RestClient.baseUrl}/cart/items/${itemId}`
        return fetch(
            url,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    static addToCart(productId: string, quantity: number = 1): Promise<any> {
        const url = `${RestClient.baseUrl}/cart/items`
        return fetch(
            url,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity })
            }
        )
    }

    static clearCart(): Promise<any> {
        const url = `${RestClient.baseUrl}/cart`
        return fetch(
            url,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }

    // shop
    static async getToteBags(): Promise<any[]> {
        const url = `${RestClient.baseUrl}/products`
        const response = await fetch(url)
        return await response.json()
    }

    static async getTote(id: string): Promise<any> {
        const url = `${RestClient.baseUrl}/products/${id}`
        const response = await fetch(url)
        return await response.json()
    }

    // drawings
    static async getDrawings(): Promise<any[]> {
        const url = `${RestClient.baseUrl}/drawings`
        const response = await fetch(url)
        return await response.json()
    }

    static async getDrawing(id: string): Promise<any> {
        const url = `${RestClient.baseUrl}/drawings/${id}`
        const response = await fetch(url)
        return await response.json()
    }
}