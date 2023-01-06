using OnlineStore.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Repository.Data
{
    public class DbInitializer
    {
        public static void Initialize(OnlineStoreDBContext context)
        {
            context.Database.EnsureCreated();

            if (context.Brands.Any())
            {
                return;
            }

            var brands = new Brand[]
            {
                new Brand{Name="AMD"},
                new Brand{Name="Intel"},
                new Brand{Name="MSI"},
                new Brand{Name="Samsung"},
                new Brand{Name="Apple"}
            };
            foreach (Brand b in brands)
            {
                context.Brands.Add(b);
            }

            context.SaveChanges();

            var categories = new Category[]
            {
                new Category{Name="Laptops"},
                new Category{Name="Smartphones"},
                new Category{Name="Processors"},
                new Category{Name="Graphic cards"},
                new Category{Name="TVs"},
                new Category{Name="Peripherals"}
            };
            foreach (Category c in categories)
            {
                context.Categories.Add(c);
            }

            context.SaveChanges();

            var products = new Product[]
            {
                new Product
                {
                    Name="AMD Ryzen 7 5800X",
                    BrandId=1,
                    CategoryId=3,
                    Description="Power up your computing experience with the AMD Ryzen 7 5800X 3.8 GHz Eight-Core AM4 Processor, which features eight cores and 16 threads to help quickly load and multitask demanding applications. Designed for socket AM4 motherboards using the powerful Zen 3 architecture, the 7nm 5th generation Ryzen processor offers significantly improved performance compared to its predecessor. With a base clock speed of 3.8 GHz and a max boost clock speed of 4.7 GHz in addition to 32MB of L3 Cache, the Ryzen 7 5800X is built to deliver the power needed to smoothly handle tasks ranging from content creation to immersive gaming experiences. You can boost performance further by overclocking this unlocked processor. Other features include support for PCIe Gen 4 technology and 3200 MHz DDR4 RAM with compatible motherboards. This processor has a 105W TDP (Thermal Design Power) and does not include a cooling solution. Please note that it does not have an integrated GPU, so a dedicated graphics card is required.",
                    Cost=237.00M
                },
                new Product
                {
                    Name="Intel Core i5-12600K",
                    BrandId=2,
                    CategoryId=3,
                    Description="Power up your productivity, gaming, and content creation experiences by installing the Intel Core i5-12600K 3.7 GHz 10-Core LGA 1700 Processor into your desktop computer system. Built using a Hybrid Core architecture with the Intel 7 process, this 12th generation desktop processor's 10 cores combine the performance of four Efficient-cores and six 3.7 GHz Performance-cores. The low-voltage Efficient-cores handle background tasks for multitasking while the Performance-cores provide speed for demanding applications and games. The built-in Intel Thread Director ensures that the two work seamlessly together by dynamically and intelligently assigning workloads to the right core at the right time to maximize performance. Additionally, this processor has a 4.9 GHz Performance-core Turbo Boost 2.0 frequency with 20MB of cache for fast and reliable performance. The Core i5-12600K also includes support for up to PCI Express 5.0 and dual-channel DDR5 memory at 4800 MHz to help run and multitask a variety of demanding applications. You can overclock this processor for even greater performance.Power up your productivity, gaming, and content creation experiences by installing the Intel Core i5-12600K 3.7 GHz 10-Core LGA 1700 Processor into your desktop computer system. Built using a Hybrid Core architecture with the Intel 7 process, this 12th generation desktop processor's 10 cores combine the performance of four Efficient-cores and six 3.7 GHz Performance-cores. The low-voltage Efficient-cores handle background tasks for multitasking while the Performance-cores provide speed for demanding applications and games. The built-in Intel Thread Director ensures that the two work seamlessly together by dynamically and intelligently assigning workloads to the right core at the right time to maximize performance. Additionally, this processor has a 4.9 GHz Performance-core Turbo Boost 2.0 frequency with 20MB of cache for fast and reliable performance. The Core i5-12600K also includes support for up to PCI Express 5.0 and dual-channel DDR5 memory at 4800 MHz to help run and multitask a variety of demanding applications. You can overclock this processor for even greater performance.",
                    Cost=251.61M
                },
                new Product
                {
                    Name="MSI GeForce RTX 4090 GAMING X TRIO",
                    BrandId=3,
                    CategoryId=4,
                    Description="Based on the Ada Lovelace architecture and designed to handle the graphical demands of 8K gaming and high frame rates, the MSI GeForce RTX 4090 GAMING X TRIO Graphics Card brings the power of real-time ray tracing and AI to your PC games. The GPU features 24GB of GDDR6X VRAM and a 384-bit memory interface, offering improved performance and power efficiency over the previous Ampere-based generation.",
                    Cost=1649.99M
                },
                new Product
                {
                    Name="Apple iPhone 14",
                    BrandId=5,
                    CategoryId=2,
                    Description="Apple's iPhone 14 models feature an updated 12-megapixel front-facing camera with an ƒ/1.9 aperture that is designed to let in more light than before for improved selfies and FaceTime video calls. It also features autofocus for the first time, which also improves image quality, and low-light selfies are 2x better.",
                    Cost=799.00M
                },
                new Product
                {
                    Name="Samsung Galaxy Book2 360 13.3\" AMOLED Touch Screen Laptop",
                    BrandId=4,
                    CategoryId=1,
                    Description="Meet Galaxy Book2 360, the new way to PC. Who doesn’t love a good team-up? Get two times the productivity when you step into the Galaxy 2-in-1 family. Is it a laptop? Is it a tablet? Yes! Tackle your projects in laptop mode. Flip it into tablet mode and doodle, draw and paint to your heart's content. Pair Galaxy Book2 360 with the rest of your Galaxy and open up a new world of convenient possibilities — call, text and video chat right from your laptop. Whatever you’re doing, everything will be supersmooth with a powerful processor. All of this at an optimal price makes this laptop-and-tablet-in-one a real crowd-pleaser. Transform your everyday with Galaxy Book2 360, the PC that’s ready to go wherever you go.",
                    Cost=1098.97M
                },
                new Product
                {
                    Name="Samsung Galaxy S22 Ultra 5G (128GB, 8GB) 6.8\"",
                    BrandId=4,
                    CategoryId=2,
                    Description="Galaxy S22 Ultra: Feast your eyes on the Galaxy S22 Ultra. Slim silhouette. Gorgeous colors. Mirrored lens ring. A polished elegant frame. Oh. So. Beautiful. Ready. Steady. Action. The smoothest in the Galaxy, this Pro-grade Camera corrects shake better than ever for steady clarity in each frame. Super HDR adjusts your shots for epic details and hues — displaying 64x more color even in tricky shadows or back-lit shots. Ultra precise. Ultra sleek. The iconic S Pen fits right into S for the first time. Eject it from the bottom to take notes, sketch, edit content with precision or control your phone. Put pen to screen while using Samsung Notes and watch your handwriting turn into text. Go all day and supercharge your night Work, play and do your thing from one day into the next with a massive 5000mAh (typical) battery that intelligently saves power for when you need it most. Your favorite content. Our brighter screen. Take your must-see content to the next level on our brightest, smoothest adaptive 120Hz display with Vision Booster to optimize brightness and color contrast.",
                    Cost=917.99M
                },
                new Product
                {
                    Name="Apple iPhone 13 Pro",
                    BrandId=5,
                    CategoryId=2,
                    Description="iPhone 13 Pro. The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Superfast 5G.¹ Durable design and the best battery life ever in an iPhone",
                    Cost=1000.00M
                },
                new Product
                {
                    Name="Samsung Xpress M2070FW Wireless Monochrome Laser Printer with Scan/Copy/Fax",
                    BrandId=4,
                    CategoryId=5,
                    Description="The Samsung Xpress M2070FW All-in-One Laser printer is perfect for your home office and combines ease of operation with high performance at an affordable price. Samsung Xpress M2070FW Laser Printer delivers hassle-free mobile printing and all-around multifunction efficiency that are perfect for your cost-conscious SOHO work environment or home office. Print from a USB drive or a range of mobile devices with quick and easy wireless printer installation. Always get reliable quality for crisp black text with Samsung’s innovative imaging technology while saving up to 20% on toner with Samsung’s Easy Eco Driver. Professional Image Quality: Samsung’s ReCP technology improves readability of printed and scanned documents by enhancing thin lines and sharpening edges. You get sharp, solid prints with an effective resolution of up to 1200 x 1200 dpi. Fast Print Speeds: Streamline your workflow and print up to 21 pages per minute, so you can spend more time producing and less time waiting. Compact, Ergonomic Design: The printer’s small footprint saves space for your home office. And the two-tone design is well suited for today’s modern office settings.",
                    Cost=135.99M
                }
            };
            foreach (Product p in products)
            {
                context.Products.Add(p);
            }

            context.SaveChanges();
        }
    }
}
