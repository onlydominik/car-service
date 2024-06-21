using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Programowanie_Lab2.Data;
using Programowanie_Lab2.Entities;
using System.Diagnostics.Contracts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Programowanie_Lab2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly DataContext _context;

        public CustomerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Customer>>> GetAllCustomers()
        {
            var customers = await _context.Customers.ToListAsync();

            return Ok(customers);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<List<Customer>>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if(customer is null)
            {
                return NotFound("Nie ma takiego klienta!");
            }

            return Ok(customer);
        }

        [HttpPost]

        public async Task<ActionResult<List<Customer>>> AddCustomer(Customer customer)
        {
            _context.Customers.Add(customer);

            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }


        [HttpPost("authenticate")]
        public async Task<ActionResult<List<Customer>>> CheckCustomer(Customer CheckCustomer)
        {
            if (CheckCustomer is null) return BadRequest();
            var customer = await _context.Customers.FirstOrDefaultAsync( x => x.username == CheckCustomer.username && x.password == CheckCustomer.password);

            if (customer is null) return NotFound("Nie ma takiego użytkownika!");

            customer.token = CreateJwt(customer);  


            return Ok(new
            {
                Token = customer.token,
                Message = "Logowanie powiodło się!"
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<List<Customer>>> RegisterCustomer(Customer RegisterCustomer)
        {
            if (RegisterCustomer is null) return BadRequest();
            
            //czy istnieje username
            if (await CheckUserNameExistAsync(RegisterCustomer.username)) return BadRequest(new { Message = "Username Already Exist!"});

            //czy istnieje email
            if (await CheckEmailExistAsync(RegisterCustomer.email)) return BadRequest(new { Message = "E-mail Already Exist!" });
            await _context.Customers.AddAsync(RegisterCustomer);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Rejestracja zakończona sukcesem!" });

        }

        [HttpDelete]

        public async Task<ActionResult<List<Customer>>> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer is null)
            {
                return NotFound("Nie ma takiego klienta!");
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();


            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut]

        public async Task<ActionResult<List<Customer>>> UpdateCustomer(Customer customerUpdate)
        {
            var customer = await _context.Customers.FindAsync(customerUpdate.Id);
            if(customer is null)
            {
                return NotFound("Nie ma takiego klienta!");
            }

            customer.FirstName = customerUpdate.FirstName;
            customer.LastName = customerUpdate.LastName;
            customer.address = customerUpdate.address;
            customer.email = customerUpdate.email;


            return Ok(await _context.Customers.ToListAsync());
        }

       

        private Task<bool> CheckUserNameExistAsync(string username) => _context.Customers.AnyAsync(x => x.username == username);

        private Task<bool> CheckEmailExistAsync(string email) => _context.Customers.AnyAsync(x => x.email == email);

        [HttpPut("{role}/{id}")]

        public async Task<ActionResult<List<Transaction>>> newRoleCustomer(string role, int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer is null)
            {
                return NotFound("Nie ma takiego użytkownika!");
            }


            customer.role = role;
            await _context.SaveChangesAsync();


            return Ok(await _context.Customers.ToListAsync());
        }



        private string CreateJwt(Customer customer)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("...........JakisSekretnyPPPPPPPPPP...........");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, customer.role),
                new Claim(ClaimTypes.Name, $"{customer.FirstName} {customer.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    
    
    
    
    
    }
}
