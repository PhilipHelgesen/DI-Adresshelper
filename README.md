# DI Address Helper 
A React Typescript application that provides address verification for Norway using the DI Address Helper V2 Api. 

## Features 

- 🏠 **Street Search**: Search for streets in Norwegian cities
- 🔢 **Street Numbers**: Get available street numbers for selected streets
- 📍 **Auto-Fill**: Postal codes and city names are automatically filled
- ✅ **Visual Confirmation**: Green indicators show confirmed selections

# Prerequisites
Before you begin, ensure you have the following installed: 
- Node.js v 16 or higher
- npm
- a valid API key for DI Address Helper V2

## Getting Started 

### 1. Clone the repository
```bash
git clone <repository-url>
cd DI-case
```
### 2. Install Dependencies 
```bash
npm install
```
### 3. Configure your API Key
1. make a new file: .env
2. add this line and replace "your-api-key" with your own API key
```typescript
export const VITE_DI_API_KEY= = 'your-api-key-here';
```
### 4. Start the server
```bash
npm run dev
```
## Usage
1. **Search for a street**: Type at least 2 characters in the "GAtenavn" field.
2. **Select Street**: Choose from the dropdown (all addresses shows "Streetname, City").
3. **Select Street Number**: Pick one of the available street numbers gathered from the api.
4. **Postalcode and City**: These fields will be automatically be filled with data collected from the two previous selections.

## API Endpoints Used
- `GET /{countryCode}/streetSearch/{searchTerm}` - Search for streets
- `GET /{countryCode}/streetNumberSearch/{streetIds}` - Get street numbers

## TODOS 
If i had more time i would add the following 
- **Interactive leaflet map**
- **Unit tests**
- **Automated Playwright test**
