using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Programowanie_Lab2.Data;
using Programowanie_Lab2.Entities;


namespace Programowanie_Lab2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("addProduct")]
        public async Task<ActionResult<List<Product>>> AddProduct(Product AddProduct)
        {
            if (AddProduct is null) return BadRequest(new { Message = "Produkt o takim modelu już istnieje!" });

            //czy istnieje juz taki model
            if (await CheckProductModelExistAsync(AddProduct.Model)) return BadRequest(new { Message = "Produkt o takim modelu już istnieje!" });

           
            await _context.Products.AddAsync(AddProduct);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Pomyślnie dodałeś produkt!" });

        }
        private Task<bool> CheckProductModelExistAsync(string Model) => _context.Products.AnyAsync(x => x.Model == Model);







        [HttpGet]   
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
           
            return Ok(products);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<List<Product>>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product is null)
            {
                return NotFound("Nie ma takiego klienta!");
            }

            return Ok(product);
        }



        [HttpPut("{quantity}/{id}")]

        public async Task<ActionResult<List<Product>>> AddQuantityProduct(int quantity, int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null)
            {
                return NotFound("Nie ma takiego produktu!");
            }

           
            product.Quantity += quantity;
            await _context.SaveChangesAsync();


            return Ok(await _context.Products.ToListAsync());
        }




        [HttpDelete("delete/{quantity}/{id}")]

        public async Task<ActionResult<List<Product>>> DeleteQuantityProduct(int quantity, int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null)
            {
                return NotFound("Nie ma takiego produktu!");
            }


            product.Quantity -= quantity;
            await _context.SaveChangesAsync();


            return Ok(await _context.Products.ToListAsync());
        }

        





        [HttpDelete]

        public async Task<ActionResult<List<Product>>> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product is null)
            {
                return NotFound("Nie ma takiego produktu!");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();


            return Ok(await _context.Products.ToListAsync());
        }
    }
}
