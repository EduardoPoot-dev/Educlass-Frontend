const { writeFileSync, mkdirSync } = require( 'fs' );

require( 'dotenv' ).config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const backendUrl = process.env[ 'BACKEND_URL' ];

if ( !backendUrl ) {
  throw new Error( 'MAPBOX_KEY is not set' );
}

const envFileContent = `
export const environment = {
  backendUrl: "${ backendUrl }"
};
`;


mkdirSync( './src/environments', { recursive: true } );

writeFileSync( targetPath, envFileContent );
writeFileSync( targetPathDev, envFileContent );
