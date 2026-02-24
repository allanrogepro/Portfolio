import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = 'Allan Rogé - Portfolio';
    const siteDescription = description || 'Étudiant en BUT MMI, créatif et passionné par le web design, le développement et la communication digitale.';
    const siteUrl = url || 'https://allan-roge.fr'; // Remplacez par votre vraie URL si connue
    const siteImage = image || '/share-image.jpg'; // Image par défaut pour le partage

    return (
        <Helmet>
            {/* Standard Types */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={siteDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />
        </Helmet>
    );
};

export default SEO;
