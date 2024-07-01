const getRequest = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}


const truncateText = async (text , l) =>{
    return text.length > l ? `${text.substring(0, l-3)}...`: text;
}

const getSlider = async () => {
    url = `https://fakestoreapi.com/products?limit=3`;
    const data = await getRequest(url);
    data.forEach((element, index) => {
        html = `
    <div class="carousel-item active">
       <img src=${element.image} class="d-block w-100" alt="..." height="400px">
   </div>
   `;
        $("#slider").append(html);

    });
}

const setProduct = async (cat , id )=>{
    const data = await getRequest(encodeURI("https://fakestoreapi.com/products/category/" + cat));
    
    data.forEach(async p => {
    
        const html =`
   
            
            <div class="col-md-4 col-lg-3 col-12">
                <div class="card mb-3">
                    <img src=${p.image} class="card-img-top" alt=${p.title}>
                    <div class="card-body">
                        <a href="descx.html?id=${p.id}" class="card-title">${await truncateText(p.title , 40)}</a>
                        <p class="card-text">${await truncateText(p.description , 50)}</p>
                        <p class="card-text">$ ${p.price}</p>
                        <div class="d-block mx-auto text-center">
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary">Buy Now</button>
                        <button type="button" class="btn btn-secondary">Add to cart</button>

                        </div>
                        </div>

                    </div>
                    <div class="card-footer text-muted">
                        2 days ago
                    </div>
                </div>
            </div>
          
   
       `;
  
       
        $(id).append(html);

    });
}
const getProductBycat = async () => {
    const cat = await getRequest("https://fakestoreapi.com/products/categories");
    
    let html = "";
    cat.forEach(async (element, index) => {
        html = `
        <div class="container">
        <div class="heading mt-5 mb-3">
        <h1 class="h1">${element}</h1>
            </div>
            <div class="row slider" id="product-${index}">
               <a class="card product-loader" id="card-link" target="_blank">
        <div class="card__header">
          <div>
            <img class="card__header header__img skeleton" id="logo-img" alt="" />
          </div>
          <h3 class="card__header header__title" id="card-title">
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
          </h3>
        </div>
      
        <div class="card__body">
          <div class="card__body body__text" id="card-details">
          <div class="skeleton skeleton-text skeleton-text__body"></div>
          </div>
          
          <div class="card__body body__img">
          <img class="skeleton" alt="" id="cover-img" />
          </div>
          </div>
          
          <div class="card__footer" id="card-footer">
          <div class="skeleton skeleton-text skeleton-footer"></div>
          </div>
          </a>
          </div>
          </div>
          `;
          $(`#product_list`).append(html);
          setProduct( element, `#product-${index}` )
        });
        
        
        $('.product-loader').hide();
  
  
    }

/*const productDetail = document.querySelector('product-detail');
console.log(productDetail);*/

const getProductById = async (id)=>{
    
    const resp = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await resp.json();
    console.log(data);

    const detailCont = document.querySelector('#detail-cont');
    const html =` <div class="col-4">
            <img src=${data.image} alt=${data.title} height="200px" width="200px">
        </div>
        <div class="col-6">
            <div class="card-body">
                <p class="card-title">${data.title}</p>
                <p class="card-text">${data.description}</p>
                <p class="card-text">$ ${data.price}</p></div>`;

                
$(detailCont).append(html);

    
}

/*function displayProduct(data){

    productDetail.innerHTML=`
     <div class="card mb-3" id="product-detail">
        
        <div class="card-body">
            <p class="card-title">${data.title}</p>
            <p class="card-text">${data.description}</p>
            <p class="card-text">$ ${data.price}</p>
            
            </div>

        </div>`  
   
     
}


getProductById();*/