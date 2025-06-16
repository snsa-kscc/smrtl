# smartell.tv website

![smartell.tv](https://github.com/user-attachments/assets/a57013ca-b8bd-447b-9451-71a0f5a01e08)

## Requirements

- **Node.js**: Version 22.x is mandatory
- **pnpm**: Package manager
- **pm2**: For production hosting

## Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd smrtl
   ```

2. Install dependencies with pnpm

   ```bash
   pnpm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration settings

4. Build the project
   ```bash
   pnpm build
   ```

## Development

Start the development server:

```bash
pnpm dev
```

## Production

Start the production server:

```bash
pnpm start
```

To specify a custom port, example 4000 (default is 3000):

```bash
pnpm start -p 4000
```

## Production Deployment with PM2

1. Install PM2 globally if not already installed

   ```bash
   npm install -g pm2
   ```

2. Build the project

   ```bash
   pnpm build
   ```

3. Start the application with PM2

   ```bash
   # Default port (3000)
   pm2 start "pnpm start" --name smrtl

   # Custom port (example: 4000)
   pm2 start "pnpm start -p 4000" --name smrtl
   ```

4. Set up PM2 to start on system boot
   ```bash
   pm2 startup
   pm2 save
   ```

### PM2 Commands

- Monitor the application: `pm2 monit`
- View logs: `pm2 logs`
- Restart the application: `pm2 restart smrtl`
- Stop the application: `pm2 stop smrtl`

## Project Structure

This project uses PayloadCMS with a Lexical rich text editor for content management.

## Notes

- Rich text content is styled via Tailwind CSS using nested selectors
- Media content is handled via 'upload' nodes in the PayloadCMS implementation
