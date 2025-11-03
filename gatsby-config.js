module.exports = {
  pathPrefix: "/messageAppFront",
  siteMetadata: {
    title: `ZMESSAGE`,
    description: `Secure, real-time messaging app.`,
    author: `badCompany55`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-emotion`,
	{
		resolve: `gatsby-plugin-manifest`,
		options: {
			name:  `ZMESSAGEAPP`,
			short_name: `ZMESSAGE`,
			start_url: `/`,
			background_color: `#FFF`,
			display: `standalone`,
			icon: `./chat.png`
		}
	},
	`gatsby-plugin-offline`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
