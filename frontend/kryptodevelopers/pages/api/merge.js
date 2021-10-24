// a) Entrada: 2 NFTs (X e Y)
//     Buscar os traits atuais dessas NTFs X e Y
//     Decidir aleatoriamente de 1 a 4 traits para serem mantidos na nova NFT (Z)
//     Decidir o restante de traits RAROS a serem dados a Z, da segunda maneira:
//         A quantidade de tokens ETB que o owner possui deve aumentar a chance de obter um trait raro
//         (Tokens ETB) -> Chamar a função getBalanceOfEtb(address _address) que determina a quantidade de tokens ETB do owner
//     Validar se a NFT Z é única (não pode ter uma igual)
//     Salva a imagem no IPFS
//     Atualizar backend com o novo metadado
//     Chamar a função merge(X, Y) que retorna o novo tokenID