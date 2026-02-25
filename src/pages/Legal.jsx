import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const Legal = () => {
    return (
        <PageTransition className="pt-32 pb-20 min-h-screen bg-gray-50">
            <SEO title="Mentions Légales" description="Mentions légales, politique de confidentialité et conditions d'utilisation du portfolio d'Allan Rogé." />
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black mb-12">Mentions Légales</h1>

                <div className="space-y-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">

                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-portfolio-yellow rounded-full"></div>
                            1. Édition du site
                        </h2>
                        <div className="text-gray-600 leading-relaxed space-y-2">
                            <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
                            <p><strong>Propriétaire du site :</strong> Allan ROGÉ</p>
                            <p><strong>Contact :</strong> allanrogepro@gmail.com</p>
                            <p><strong>Adresse :</strong> 55 place de la république 62300 Lens</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            2. Hébergement
                        </h2>
                        <div className="text-gray-600 leading-relaxed">
                            <p>Le site est hébergé par :</p>
                            <p className="mt-2 text-sm bg-gray-50 p-4 rounded-xl inline-block">
                                <strong>Netlify, Inc.</strong><br />
                                512 2nd Street, Suite 200<br />
                                San Francisco, CA 94107, USA<br />
                                support@netlify.com
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-portfolio-yellow rounded-full"></div>
                            3. Propriété intellectuelle
                        </h2>
                        <div className="text-gray-600 leading-relaxed">
                            <p>
                                <strong>Allan ROGÉ</strong> est propriétaire des droits de propriété intellectuelle et détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, architecture, icônes et sons.
                            </p>
                            <p className="mt-4">
                                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            4. Données personnelles
                        </h2>
                        <div className="text-gray-600 leading-relaxed">
                            <p>
                                Ce site ne collecte aucune donnée personnelle à l'insu de l'utilisateur. Les informations recueillies via le formulaire de contact (Nom, Email) ne sont utilisées que pour répondre à votre demande et ne sont jamais transmises à des tiers.
                            </p>
                            <p className="mt-4">
                                Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant : <strong>allanrogepro@gmail.com</strong>.
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </PageTransition>
    );
};

export default Legal;
