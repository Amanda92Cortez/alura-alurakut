import React from 'react';
import { makePublicRouterInstance } from 'next/dist/client/router'
import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades){
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
    )
}


// function ProfileRelationsBox(propriedades) {
//   return (
//     <ProfileRelationsBoxWrapper>
//       <h2 className="smallTitle">
//         {propriedades.title} ({propriedades.items.length})
//       </h2>
//       <ul>
//         {seguidores.map((itemAtual) => {
//           return (
//             <li key={itemAtual.id}>
//               <a href={`https://github.com/${itemAtual.login}`}>
//                 <img src={itemAtual.avatar_url} />
//                 <span>{itemAtual.login}</span>
//               </a>
//             </li>
//           )
//         })}
//       </ul>
//     </ProfileRelationsBoxWrapper>
//   )
// }

function ProfileRelationsBox(propriedades) {
	const listaSeguidores = propriedades.items.slice(0, 6)
	return (
		<ProfileRelationsBoxWrapper>
			<h2 className='smallTitle'>
				{propriedades.title} ({propriedades.items.length})
			</h2>
			<ul>
				{
					listaSeguidores.map((seguidor) => {
						return (
							<li key={seguidor.id}>
								<a href={`https://github.com/${seguidor.login}`}>
									<img src={seguidor.avatar_url} />
									<span>{seguidor.login}</span>
								</a>
							</li>
						)
					})
				}
			</ul>
		</ProfileRelationsBoxWrapper>
	)
}


export default function Home() {
  
  const githubUser = 'amanda92cortez'
  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades[0];
  // const alteradorDeComunidades = comunidades[1];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]

  // 0 - Pegar array 
  
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function(){
    // GET ..
    const seguidores = fetch('https://api.github.com/users/amanda92cortez/followers')
    .then(function(respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers:{
        'Authorization':'218173d4a42a53c1d98fa035893a00',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query{
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato);
      setComunidades(comunidadesVindasDoDato)
      
    })
    // .then(funtion(response){
    //   return response.json()
    // })
  }, [])

  // 1- Criar um box que vai ter um map, baseado no itens do array que pegamos no Github


  return (
    <>
    <AlurakutMenu/>
    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea' }}>
       <ProfileSidebar githubUser={githubUser}/>
      </div>
      
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers:{
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })  
              .then(async(response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })

            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" 
                      name="title" 
                      aria-label="Qual vai ser o nome da sua comunidade?" 
                      type="text"/>
              </div>

              <div>
                <input placeholder="Coloque uma URL para usarmos de capa" 
                      name="image" 
                      aria-label="Coloque uma URL para usarmos de capa" />
              </div>

              <button>
                Criar comunidade
              </button>


            </form>
          </Box>

      </div>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea' }}>
        {/* Seguidores */ }
        <ProfileRelationsBox title="Seguidores" items={seguidores} />
        
        {/* Comunidades */ }
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
              {comunidades.map((itemAtual) => {
                return(
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.id}`}> 
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>

        {/* Pessoas da Comunidade*/}
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Pessoas da comunidade ({pessoasFavoritas.length})
          </h2>
          
          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return(
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}> 
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        

      </div>
    </MainGrid>
    </>
  )
}
