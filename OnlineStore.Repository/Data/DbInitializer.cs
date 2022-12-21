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

            var products = new Product[]
            {
                new Product
                {
                    Name="AMD Ryzen 7 5800X",
                    BrandId=1,
                    Description="Power up your computing experience with the AMD Ryzen 7 5800X 3.8 GHz Eight-Core AM4 Processor, which features eight cores and 16 threads to help quickly load and multitask demanding applications. Designed for socket AM4 motherboards using the powerful Zen 3 architecture, the 7nm 5th generation Ryzen processor offers significantly improved performance compared to its predecessor. With a base clock speed of 3.8 GHz and a max boost clock speed of 4.7 GHz in addition to 32MB of L3 Cache, the Ryzen 7 5800X is built to deliver the power needed to smoothly handle tasks ranging from content creation to immersive gaming experiences. You can boost performance further by overclocking this unlocked processor. Other features include support for PCIe Gen 4 technology and 3200 MHz DDR4 RAM with compatible motherboards. This processor has a 105W TDP (Thermal Design Power) and does not include a cooling solution. Please note that it does not have an integrated GPU, so a dedicated graphics card is required.",
                    Cost=237.00M
                },
                new Product
                {
                    Name="Intel Core i5-12600K",
                    BrandId=2,
                    Description="Power up your productivity, gaming, and content creation experiences by installing the Intel Core i5-12600K 3.7 GHz 10-Core LGA 1700 Processor into your desktop computer system. Built using a Hybrid Core architecture with the Intel 7 process, this 12th generation desktop processor's 10 cores combine the performance of four Efficient-cores and six 3.7 GHz Performance-cores. The low-voltage Efficient-cores handle background tasks for multitasking while the Performance-cores provide speed for demanding applications and games. The built-in Intel Thread Director ensures that the two work seamlessly together by dynamically and intelligently assigning workloads to the right core at the right time to maximize performance. Additionally, this processor has a 4.9 GHz Performance-core Turbo Boost 2.0 frequency with 20MB of cache for fast and reliable performance. The Core i5-12600K also includes support for up to PCI Express 5.0 and dual-channel DDR5 memory at 4800 MHz to help run and multitask a variety of demanding applications. You can overclock this processor for even greater performance.Power up your productivity, gaming, and content creation experiences by installing the Intel Core i5-12600K 3.7 GHz 10-Core LGA 1700 Processor into your desktop computer system. Built using a Hybrid Core architecture with the Intel 7 process, this 12th generation desktop processor's 10 cores combine the performance of four Efficient-cores and six 3.7 GHz Performance-cores. The low-voltage Efficient-cores handle background tasks for multitasking while the Performance-cores provide speed for demanding applications and games. The built-in Intel Thread Director ensures that the two work seamlessly together by dynamically and intelligently assigning workloads to the right core at the right time to maximize performance. Additionally, this processor has a 4.9 GHz Performance-core Turbo Boost 2.0 frequency with 20MB of cache for fast and reliable performance. The Core i5-12600K also includes support for up to PCI Express 5.0 and dual-channel DDR5 memory at 4800 MHz to help run and multitask a variety of demanding applications. You can overclock this processor for even greater performance.",
                    Cost=251.61M
                },
                new Product
                {
                    Name="MSI GeForce RTX 4090 GAMING X TRIO",
                    BrandId=3,
                    Description="Based on the Ada Lovelace architecture and designed to handle the graphical demands of 8K gaming and high frame rates, the MSI GeForce RTX 4090 GAMING X TRIO Graphics Card brings the power of real-time ray tracing and AI to your PC games. The GPU features 24GB of GDDR6X VRAM and a 384-bit memory interface, offering improved performance and power efficiency over the previous Ampere-based generation.",
                    Cost=1649.99M
                },
                new Product
                {
                    Name="Samsung 2TB 970 EVO Plus NVMe M.2 Internal SSD",
                    BrandId=4,
                    Description="Built using their V-NAND 3-bit MLC flash technology for reliable performance, the 2TB 970 EVO Plus NVMe M.2 Internal SSD from Samsung offers enhanced bandwidth, low latency, and power efficiency. Designed for tech enthusiasts, high-end gamers, and 4K & 3D content designers, it delivers sequential read speeds of up to 3500 MB/s, sequential write speeds of up to 3200 MB/s, an endurance of up to 1200 TBW, up to 1.5 million hours MTBF, AES 256-bit encryption, and support for both SMART and TRIM. Moreover, it has an M.2 2280 form factor, which is compatible with a wide range of devices, and utilizes the PCIe 3.0 x4 interface. Download Samsung's Smart Magician software to track your drive's health, performance, and install new updates, while Samsung's Dynamic Thermal Guard helps reduce the risk overheating to minimized performance drops.",
                    Cost=159.99M
                },
                new Product
                {
                    Name="Apple 13.6\" MacBook Air",
                    BrandId=5,
                    Description="The Apple 13.6\" MacBook Air now features the Apple M2 chip, which has many improvements over its predecessor, the M1. The Apple M2 integrates the CPU, GPU, Neural Engine, I/O, and more into a single system on a chip (SoC), this time utilizing 2nd-Gen 5nm process technology. Tackle your projects with the fast 8-Core CPU and take on graphics-intensive apps and games with the 8-core GPU. Accelerate machine learning tasks with the 16-core Neural Engine. The M2 also features 100 GB/s memory bandwidth. The M2 was also designed to speed up video workflows by adding a next-gen media engine and a powerful ProRes video engine for hardware-accelerated encode and decode. This means the M2 can play back more streams of 4K and 8K video. Complete with a silent, fanless design and up to 18 hours of battery life, the MacBook Air is still portable, but now a lot more powerful. It also has 8GB of unified RAM and a 256GB SSD.",
                    Cost=1049.00M
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
