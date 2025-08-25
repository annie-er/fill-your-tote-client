export class RestClient {

    static baseUrl = "http://localhost:8080"

    // contact
    static async submitContactForm(contactData: any): Promise<any> {
        const url = `${RestClient.baseUrl}/contact`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData)
        })
        
        if (!response.ok) {
            throw new Error(`Failed to submit contact form: ${response.statusText}`)
        }
        
        return await response.json()
    }

    // cart
    static async getCartItems(): Promise<any[]> {
        const url = `${RestClient.baseUrl}/cart`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to get cart items: ${response.statusText}`)
        }

        const data = await response.json()

        const itemsWithFixedUrls = data.map((item: any) => ({
            ...item,
            image: item.image && !item.image.startsWith('http')
                ? `${RestClient.baseUrl}${item.image}`
                : item.image
        }))

        return itemsWithFixedUrls
    }


    static async getCartSummary(): Promise<any> {
        const url = `${RestClient.baseUrl}/cart/summary`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to get cart summary: ${response.statusText}`)
        }
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

    // shop (products/totes)
    static async getToteBags(): Promise<any[]> {
        const url = `${RestClient.baseUrl}/products`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to get tote bags: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        const productsWithFixedUrls = data.map((product: any) => ({
            ...product,
            imageUrl: product.imageUrl && product.imageUrl.startsWith('http') 
                ? product.imageUrl 
                : product.imageUrl 
                    ? `http://localhost:8080${product.imageUrl}`
                    : null
        }));
        
        return productsWithFixedUrls
    }

    static async getTote(identifier: string): Promise<any> {
        const url = `${RestClient.baseUrl}/products/${identifier}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Product not found: ${identifier}`)
        }
        
        const data = await response.json()
        
        if (data.imageUrl && !data.imageUrl.startsWith('http')) {
            data.imageUrl = `http://localhost:8080${data.imageUrl}`
        }
        
        return data
    }

    // drawings
    static async getDrawings(): Promise<any[]> {
        const url = `${RestClient.baseUrl}/drawings`
        console.log("Fetching from URL:", url);
        
        try {
            const response = await fetch(url)
            console.log("Response status:", response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Failed to get drawings: ${response.status} ${response.statusText}`)
            }
            
            const data = await response.json()
            console.log("Raw response data:", data);
            
            const drawingsWithFullUrls = data.map((drawing: any) => ({
                ...drawing,
                imageUrl: drawing.imageUrl.startsWith('http') 
                    ? drawing.imageUrl 
                    : `http://localhost:8080${drawing.imageUrl}`
            }));
            
            console.log("Processed drawings:", drawingsWithFullUrls);
            return drawingsWithFullUrls
        } catch (error) {
            console.error("Network error:", error);
            throw error;
        }
    }

    static async getDrawing(identifier: string): Promise<any> {
        const url = `${RestClient.baseUrl}/drawings/${identifier}`
        console.log("Fetching drawing from URL:", url);
        
        try {
            const response = await fetch(url)
            console.log("Drawing response status:", response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Drawing not found: ${identifier}`)
            }
            
            const data = await response.json()
            console.log("Raw drawing data:", data);
            
            if (data.imageUrl && !data.imageUrl.startsWith('http')) {
                data.imageUrl = `${RestClient.baseUrl}${data.imageUrl}`
            }
            
            console.log("Processed drawing with fixed URL:", data);
            return data
        } catch (error) {
            console.error("Error fetching drawing:", error);
            throw error;
        }
    }
}